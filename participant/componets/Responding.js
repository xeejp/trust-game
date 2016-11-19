import React, { Component } from 'react'
import { connect } from 'react-redux'

import Chip from 'material-ui/chip';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import Slider from 'material-ui/Slider'
import RaisedButton from 'material-ui/RaisedButton';

import { getRoleName } from 'util/index'

import {
  syncResTemp,
  finishResponding,
} from '../actions.js'

const mapStateToProps = ({ inv_final, res_temp, role, game_point, game_rate }) => ({
  inv_final, res_temp, role, game_point, game_rate,
})

class Responding extends Component {
  constructor() {
    super()
    this.handleThinking = this.handleThinking.bind(this)
    this.handleConfirm = this.handleConfirm.bind(this)
  }

  handleThinking = (event, value) => {
    const { dispatch } = this.props
    dispatch(syncResTemp(value))
  }

  handleConfirm = (event, value) => {
    const { dispatch, res_temp } = this.props
    dispatch(finishResponding(res_temp))
  }

  render() {
    const { role, inv_final, res_temp, game_point, game_rate } = this.props
    const styles = {
      rised: {
        margin: 12,
      },
      chips: {
        margin: 4,
      }
    }

    const enemy = (role == "responder")? "investor" : "responder"
    return (
      <div>
        <Card>
          <CardHeader
            title={"あなたは" + getRoleName(role) + "側です"}
            subtitle={role == "investor"? getRoleName(enemy) + "が応答中。しばらくお待ちください。" : "返すポイントを決定してください。"}
          />
          <CardText>
            {role == "responder"?
                <span style={{margin: 4}}>
                  <Chip style={styles.chips}>投資されたポイント: {inv_final} × {game_rate} = {inv_final*game_rate}</Chip>
                  <Chip style={Object.assign({}, styles.chips, {float: "left"})}>あなたに残るポイント: {inv_final*game_rate - res_temp}</Chip>
                </span>
              :
                <span style={{margin: 4}}>
                  <Chip style={styles.chips}>投資したポイント: {inv_final} × {game_rate} = {inv_final*game_rate}</Chip>
                  <Chip style={{float: "left"}}>あなたに返却されるポイント: {res_temp}</Chip>
                </span>
            }
            <Slider
              min={0}
              max={inv_final*game_rate}
              step={1}
              value={ role == "responder"? res_temp : inv_final*game_rate - res_temp }
              onChange={this.handleThinking}
              disabled={role == "investor"}
              style={{height: '30px'}}
            />
            {role == "responder"?
                <span style={{margin: 4}}>
                  <Chip style={Object.assign({}, styles.chips, {float: "right"})}>投資者に返却されるポイント: {res_temp}</Chip>
                </span>
              :
                <span style={{margin: 4}}>
                  <Chip style={{float: "right"}}>応答者に残るポイント: {inv_final*game_rate - res_temp}</Chip>
                </span>
            }
          </CardText>
          <CardActions>
            <RaisedButton
              label="返却ポイント確定"
              primary={true}
              style={styles.rised}
              onClick={this.handleConfirm}
              disabled={role == "investor"}
            />
          </CardActions>
        </Card>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Responding)
