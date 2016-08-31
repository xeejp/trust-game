import React, { Component } from 'react'
import { connect } from 'react-redux'

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
    const style = {
      margin: 12,
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
              <span>
              <p>あなたのポイント: 投資されたポイント({inv_final}) × 仲介者の倍率({game_rate})
                - 返却するポイント({res_temp}) = 最終的なポイント({inv_final*game_rate - res_temp})</p>
              <p>投資者のポイント: 初めに貰ったポイント({game_point}) - あなたに投資したポイント({inv_final})
              + あなたが返却するポイント({res_temp}) = 最終的なポイント({game_point - inv_final + res_temp})</p>
              </span>
            :
              <span>
              <p>あなたのポイント: 初めに貰ったポイント({game_point}) - 応答者に投資したポイント({inv_final})
              + 応答者が返却するポイント({res_temp}) = 最終的なポイント({game_point - inv_final + res_temp})</p>
              <p>応答者のポイント: 投資されたポイント({inv_final}) × 仲介者の倍率({game_rate})
                - あなたに返却するポイント({res_temp}) = 最終的なポイント({inv_final*game_rate - res_temp})</p>
              </span>
            }
            <Slider
              min={0}
              max={inv_final*game_rate}
              step={1}
              value={ role == "responder"? res_temp : inv_final - res_temp }
              onChange={this.handleThinking}
              disabled={role == "investor"}
            />
            <RaisedButton
              label="返却ポイント確定"
              primary={true}
              style={style}
              onClick={this.handleConfirm}
              disabled={role == "investor"}
            />
          </CardText>
        </Card>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Responding)
