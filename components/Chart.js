import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, CardHeader, CardText } from 'material-ui/Card'

import Highcharts from 'react-highcharts'
import ChartSetting from './ChartSetting.js'

import { fallChartButton } from 'host/actions.js'

function compCate(results, round) {
  const keys = results[round]? Object.keys(results[round]) : [] // [1, 2, ...pair_id]
  return keys.sort((a, b) => {results[round][a]["hold"] + results[round][a]["return"]
    - results[round][b]["hold"] + results[round][b]["return"]})
}

function compData(categories, results, round) {
  console.log("categories = ")
  console.log(categories)
  const hold_values = results[round]? Array.from(categories).map(pair_id =>
    results[round][pair_id]? results[round][pair_id]["hold"] : 0) : []
  console.log("hold_values = ")
  console.log(hold_values)
  const return_values = results[round]? Array.from(categories).map(pair_id =>
    results[round][pair_id]? results[round][pair_id]["return"] : 0) : []
  console.log("return_values = ")
  console.log(return_values)
  return [
    {
      name: "返却したポイント",
      data: Array.from(categories).map(p_id => return_values[p_id]? return_values[p_id] : 0),
      stack: "pair",
      tooltip: {
        valueSuffix: " [ポイント]"
      }
    }
  ].concat([
    {
      name: "残したポイント",
      data: Array.from(categories).map(p_id => hold_values[p_id]? hold_values[p_id] : 0),
      stack: "pair",
      tooltip: {
        valueSuffix: " [ポイント]"
      }
    }
  ].concat([
    {
      yAxis: 1,
      name: "戻された割合",
      data: Array.from(categories).map(p_id =>
        hold_values[p_id] && return_values[p_id]?
          Math.round(return_values[p_id] * 100 / (return_values[p_id] + hold_values[p_id])) : 0),
      type: "spline",
      dashStyle: "shortdot",
      tooltip: {
        valueSuffix: " [%]"
      }
    }
  ]))
}

const mapStateToProps = ({ trust_results, chart_round, chart_button }) => ({
  trust_results,
  chart_round,
  chart_button,
  config: {
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
        categories: compCate(trust_results, chart_round),
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
      series: compData(compCate(trust_results, chart_round), trust_results, chart_round),
    }
})

class Chart extends Component {
  constructor(props) {
    super(props)
    const { role } = this.props
    this.handleCallback = this.handleCallback.bind(this)
    this.state = {
      expanded: Boolean(role),
      round: 1,
    }
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
    const { config } = this.props
    console.log(config)
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
          <Highcharts config={config} callback={this.handleCallback}></Highcharts>
          <ChartSetting />
        </CardText>
      </Card>
    </div>
    )
  }
}

export default connect(mapStateToProps)(Chart)
