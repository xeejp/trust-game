import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import Slider from 'material-ui/Slider'
import RaisedButton from 'material-ui/RaisedButton';

import { getRoleName } from '../../util/index.js'

import {
  syncInvTemp,
  finishInvesting,
} from '../actions.js'

const mapStateToProps = ({ role, inv_temp, game_point, game_rate }) => ({
  role,
  inv_temp,
  game_point,
  game_rate,
})

class Investing extends Component {
  constructor() {
    super()
    this.handleThinking = this.handleThinking.bind(this)
    this.handleConfirm = this.handleConfirm.bind(this)
  }

  handleThinking = (event, value) => {
    const { dispatch } = this.props
    dispatch(syncInvTemp(value))
  }

  handleConfirm = (event, value) => {
    const { dispatch, inv_temp } = this.props
    dispatch(finishInvesting(inv_temp))
  }

  render() {
    const { role, inv_temp, game_point, game_rate } = this.props
    const style = {
      margin: 12,
    }
    const enemy = (role == "responder")? "investor" : "responder"
    return (
      <div>
        <Card>
          <CardHeader
            title={"あなたは" + getRoleName(role) + "側です"}
            subtitle={role == "responder"? getRoleName(enemy) + "が投資中。しばらくお待ちください。" : "投資してください。"}
          />
          <CardText>
            {role == "investor"?
              <p>あなたに残るポイント: {game_point - inv_temp} 応答者に投資されるポイント: {inv_temp} × {game_rate} = {inv_temp * game_rate }</p>
            :
              <p>あなたに投資されるポイント: {inv_temp} × {game_rate} = {inv_temp * game_rate } 投資者に残るポイント: {game_point - inv_temp}</p>
            }
            <Slider
              min={0}
              max={game_point}
              step={1}
              value={ role == "investor"? inv_temp : game_point - inv_temp }
              onChange={this.handleThinking}
              disabled={role == "responder"}
            />
            <RaisedButton
              label="投資ポイント確定"
              primary={true}
              style={style}
              onClick={this.handleConfirm}
              disabled={role == "responder"}
            />
          </CardText>
        </Card>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Investing)
