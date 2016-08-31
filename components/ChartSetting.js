import React, { Component } from 'react'
import { connect } from 'react-redux'

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Chip from 'material-ui/chip'

import { changeChartRound } from 'host/actions.js'

const mapStateToProps = ({ chart_round, dictator_results }) => ({
  chart_round,
  dictator_results,
  max_chart_round: Object.keys(dictator_results).length
})

const styles = {
  roundButton: {
    margin: 12,
  },
}

class ChartSetting extends Component {
  constructor() {
    super()
    this.handleInc = this.handleInc.bind(this)
    this.handleDec = this.handleDec.bind(this)
  }

  handleInc = () => {
    const { chart_round, dispatch } = this.props
    dispatch(changeChartRound(chart_round + 1))
  }

  handleDec = () => {
    const { chart_round, dispatch } = this.props
    dispatch(changeChartRound(chart_round - 1))
  }

  render() {
    const { chart_round, max_chart_round } = this.props
    return (
      <div>
          <Chip style={{margin: 4}}>表示ラウンド: {chart_round}</Chip>
          { chart_round != 1?
            <RaisedButton
              label="-"
              style={styles.roundButton}
              onClick={this.handleDec}
            />
            :
            <FlatButton
              label="-"
              style={styles.roundButton}
            />
          }
          { chart_round < max_chart_round?
            <RaisedButton
              label="+"
              style={styles.roundButton}
              onClick={this.handleInc}
            />
            :
            <FlatButton
              label="+"
              style={styles.roundButton}
            />
          }
      </div>
    )
  }
}

export default connect(mapStateToProps)(ChartSetting)
