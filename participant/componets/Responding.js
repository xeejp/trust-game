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
      chip: {
        margin: 4,
      },
    }

    const enemy = (role == "responder")? "investor" : "responder"
    return (
      <div>
        {role == "investor"?
          <Card>
            <CardHeader
              title={"あなたは投資者です。"}
              subtitle={"相手が返却ポイントを選択中です。しばらくお待ちください。"}
            />
            <CardText>
              <div>相手に渡したポイント: {inv_final}ポイント</div>
              <div>相手が受け取ったポイント: {inv_final}ポイント × {game_rate}倍 = {inv_final*game_rate}ポイント</div>
              <div>手もとに残ったポイント: {game_point-inv_final}ポイント</div>
              <span style={{display: "flex", flexWrap: "wrap"}}>
                <Chip style={{margin: 4}}>{res_temp? "相手は入力中です。": "相手は待機中です。"}</Chip>
              </span>
            </CardText>
          </Card>
        :
          <Card>
            <CardHeader
              title={"あなたは応答者です。"}
              subtitle={"返却ポイントを選択してください。"}
            />
            <CardText>
              <div>相手から受け取ったポイント: {inv_final} × {game_rate} = {inv_final*game_rate}</div>
              <span style={{margin: 8}}>
                <Chip style={{float: "left"}}>手もとに残るポイント: {inv_final * game_rate - res_temp}ポイント</Chip>
              </span>
              <Slider
                min={0}
                max={inv_final * game_rate}
                step={1}
                value={res_temp}
                onChange={this.handleThinking}
                style={{height: '30px'}}
              />
              <span style={{margin: 4}}>
                <Chip style={{float: "right"}}>相手に渡すポイント: {res_temp}ポイント</Chip>
              </span>
            </CardText>
            <CardActions>
              <RaisedButton
                label="確定"
                primary={true}
                style={styles.rised}
                onClick={this.handleConfirm}
              />
            </CardActions>
          </Card>
       }
      </div>
    )
  }
}

export default connect(mapStateToProps)(Responding)
