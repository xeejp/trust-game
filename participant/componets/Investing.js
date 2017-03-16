import React, { Component } from 'react'
import { connect } from 'react-redux'

import Chip from 'material-ui/chip';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton';
import { pink400, blue400, orange400 } from 'material-ui/styles/colors';
import Avatar from 'material-ui/Avatar'
import List from 'material-ui/List/List'
import ListItem from 'material-ui/List/ListItem'

import { getRoleName } from '../../util/index.js'

import {
  syncInvTemp,
  finishInvesting,
} from '../actions.js'
import { Slider } from 'xee-components'

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
       {role == "investor"?
        <Card>
          <CardHeader
            title={"あなたは投資者です。"}
            subtitle={"投資ポイントを選択してください。"}
          />
          <CardText>
            <List>
              <ListItem>
                <p>手もとに残るポイント</p>
                <Avatar
                  backgroundColor={pink400}
                  size={50}
                  style={{margin: 5}}
                >
                  {game_point - inv_temp}
                </Avatar>ポイント
              </ListItem>
              <ListItem>
                <p>相手に渡すポイント</p>
                <Avatar
                  backgroundColor={blue400}
                  size={50}
                  style={{margin: 5}}
                >
                  {inv_temp}
                </Avatar>ポイント
              </ListItem>
              <ListItem>
                <Slider
                  min={0}
                  max={game_point}
                  divisor={10}
                  value={inv_temp}
                  onChange={this.handleThinking}
                />
              </ListItem>
            </List>
          </CardText>
          <CardActions>
            <RaisedButton
              label="確定"
              primary={true}
              style={style}
              onClick={this.handleConfirm}
            />
          </CardActions>
        </Card>
        :
        <Card>
          <CardHeader
            title={"あなたは応答者です。"}
            subtitle={"相手が投資ポイントを選択しています。しばらくお待ちください。"}
          />
          <CardText>
            <span style={{margin: 8}}>
              <Chip style={{float: "left"}}>{inv_temp? "相手は入力中です。": "相手は待機中です。"}</Chip>
            </span>
          </CardText>
        </Card>
        }
      </div>
    )
  }
}

export default connect(mapStateToProps)(Investing)
