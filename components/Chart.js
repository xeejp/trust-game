import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, CardHeader, CardText } from 'material-ui/Card'
import Chip from 'material-ui/chip'

import Highcharts from 'react-highcharts'
import SwipeableViews from 'react-swipeable-views';
import { grey300 } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import RightIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import LeftIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-left'

import { fallChartButton, changeChartRound } from 'host/actions.js'

function compCate(results, round) {
  const keys = results[round]? Object.keys(results[round]) : []
  return keys.sort((a, b) => (results[round][b]["hold"] + results[round][b]["return"])
    - (results[round][a]["hold"] + results[round][a]["return"]))
}

function compData(categories, results, round) {
  const keys = results[round]? Object.keys(results[round]) : []
  const hold_values = results[round]? Array.from(keys).map(pair_id =>
    results[round][pair_id]? results[round][pair_id]["hold"] : 0) : []
  const return_values = results[round]? Array.from(keys).map(pair_id =>
    results[round][pair_id]? results[round][pair_id]["return"] : 0) : []
  return [
    {
      name: "返却したポイント",//[1,0]
      data: Array.from(categories).map(p_id => (return_values[p_id]? return_values[p_id] : 0)),
      stack: "pair",
      tooltip: {
        valueSuffix: " [ポイント]"
      }
    }
  ].concat([
    {
      name: "残したポイント",
      data: Array.from(categories).map(p_id => (hold_values[p_id]? hold_values[p_id] : 0)),
      stack: "pair",
      tooltip: {
        valueSuffix: " [ポイント]"
      }
    }
  ].concat([
    {
      yAxis: 1,
      name: "戻された割合",
      data: Array.from(categories).map(p_id => (
        hold_values[p_id] && return_values[p_id]?
          Math.round(return_values[p_id] * 100 / (return_values[p_id] + hold_values[p_id])) : 0)),
      type: "spline",
      dashStyle: "shortdot",
      tooltip: {
        valueSuffix: " [%]"
      }
    }
  ]))
}

const mapStateToProps = ({ trust_results, chart_button, chart_round, role }) => {
  console.log(trust_results)
  const config = []
  for(let i = 0; i < (trust_results? Object.keys(trust_results).length : 0); i ++) {
    config[i] = {
      chart: {
         type: "column"
      },
      credits: {
        text: 'xee.jp',
        href: 'https://xee.jp/'
      },
      title: {
        text: "応答者の分配"
      },
      xAxis: {
        categories: compCate(trust_results, i+1),
        crosshair: true,
        title: {
          text: "ペア"
        },
      },
      yAxis: [
        {
          min: 0,
          title: {
            text: "ポイント"
          },
          labels: {
            step: 1,
          },
        },
        {
          min: 0,
          max: 100,
          title: {
            text: "戻された割合 [%]"
          },
          opposite: true,
        }
      ],
      tooltip: {
        shared: true,
        formatter: function () {
          var line = '<b>ペアID: ' + this.x + '</b><br/>'
          this.points.forEach(i => {
            line += i.series.name + ': ' + i.y + '<br />'
          })
          return line
        }
      },
      plotOptions: {
        column: {
          stacking: 'normal'
        }
      },
      series: compData(compCate(trust_results, i+1), trust_results, i+1),
    }
  }
  return {
    config: config,
    max_chart_round: Object.keys(trust_results).length,
    trust_results,
    chart_button,
    chart_round,
    role
  }
}

class Chart extends Component {
  constructor(props) {
    super(props)
    const { role } = this.props
    this.handleCallback = this.handleCallback.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleInc = this.handleInc.bind(this)
    this.handleDec = this.handleDec.bind(this)
    this.state = {
      expanded: Boolean(role),
      round: 1,
    }
  }

  handleChange = (index, fromIndex) => {
    const { chart_round, dispatch } = this.props
    const diff = index - fromIndex
    dispatch(changeChartRound(diff + chart_round))
  }

  handleInc = () => {
    const { chart_round, dispatch } = this.props
    dispatch(changeChartRound(chart_round + 1))
  }

  handleDec = () => {
    const { chart_round, dispatch } = this.props
    dispatch(changeChartRound(chart_round - 1))
  }

  handleCallback = () => {
    const { dispatch, chart_button } = this.props
    if(chart_button){
      window.setTimeout(() => {
        location.href="#chart"
      }, 1 )
    }
    dispatch(fallChartButton())
  }

  handleExpandChange = (expanded) => {
    this.setState({expanded: expanded});
  }

  render() {
    const { config, chart_round, max_chart_round } = this.props

    const charts = []
    for(let i = 0; i < (config? config.length : 0); i ++) {
      charts[i] = (
        <div>
          <Highcharts config={config[i]} callback={this.handleCallback}></Highcharts>
        </div>
      )
    }
    const styles = {
      mediumIcon: {
        width: 48,
        height: 48,
      },
      left: {
        width: 96,
        height: 96,
        padding: 24,
        float: "left",
      },
      right: {
        width: 96,
        height: 96,
        padding: 24,
        float: "right",
      }
    }
    return (
    <div id="chart">
      <Card
        style={{margin: '16px 16px'}}
        expanded={this.state.expanded}
        onExpandChange={this.handleExpandChange}
      >
        <CardHeader
          title="グラフ"
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          <SwipeableViews index={chart_round-1} onChangeIndex={this.handleChange}>
            {charts}
          </SwipeableViews>
          <div>
            { chart_round != 1?
              <IconButton iconStyle={styles.mediumIcon} style={styles.left}
                tooltip="ラウンドを下げる" onClick={this.handleDec}>
                <LeftIcon/>
              </IconButton>
            :
              <IconButton iconStyle={styles.mediumIcon} style={styles.left}
                tooltip="最初のラウンドです">
                <LeftIcon color={grey300}/>
              </IconButton>
            }
            { chart_round != max_chart_round?
              <IconButton iconStyle={styles.mediumIcon} style={styles.right}
                tooltip="ラウンドを上げる" onClick={this.handleInc} >
                <RightIcon/>
              </IconButton>
            :
              <IconButton iconStyle={styles.mediumIcon} style={styles.right}
                tooltip="最後のラウンドです">
                <RightIcon color={grey300}/>
              </IconButton>
            }
            <Chip style={{clear: "both", margin: "auto"}}>表示ラウンド: {chart_round}</Chip>
          </div>
        </CardText>
      </Card>
    </div>
    )
  }
}

export default connect(mapStateToProps)(Chart)
