import React, { Component } from 'react'
import { connect } from 'react-redux'

import Chip from 'material-ui/chip';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import { pink400, blue400, orange400 } from 'material-ui/styles/colors';
import Avatar from 'material-ui/Avatar'
import List from 'material-ui/List/List'
import ListItem from 'material-ui/List/ListItem'

import { getRoleName } from 'util/index'

import {
  syncResTemp,
  finishResponding,
} from '../actions.js'
import Slider from '../Slider.js'

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
              <List>
                <ListItem>
                  <p>相手に渡したポイント</p>
                  <Avatar
                    backgroundColor={blue400}
                    size={50}
                    style={{margin: 5}}
                  >
                    {inv_final}
                  </Avatar>ポイント
                </ListItem>
                <ListItem>
                  <p>相手が受け取ったポイント</p>
                  <Avatar
                    backgroundColor={blue400}
                    size={50}
                    style={{margin: 5}}
                  >
                    {inv_final}
                  </Avatar>×{game_rate}倍＝
                  <Avatar
                    backgroundColor={blue400}
                    size={50}
                    style={{margin: 5}}
                  >
                    {inv_final*game_rate}
                  </Avatar>ポイント
                </ListItem>
                <ListItem>
                  <p>手もとに残ったポイント</p>
                  <Avatar
                    backgroundColor={pink400}
                    size={50}
                    style={{margin: 5}}
                  >
                    {game_point-inv_final}
                  </Avatar>ポイント
                </ListItem>
              </List>
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
              <List>
                <ListItem>
                  <p>相手から受け取ったポイント</p>
                  <Avatar
                    backgroundColor={blue400}
                    size={50}
                    style={{margin: 5}}
                  >
                    {inv_final}
                  </Avatar>×{game_rate}倍＝
                  <Avatar
                    backgroundColor={pink400}
                    size={50}
                    style={{margin: 5}}
                  >
                    {inv_final*game_rate}
                  </Avatar>
                </ListItem>
                <ListItem>
                  <Slider
                    divisor={10}
                    min={0}
                    max={inv_final * game_rate}
                    step={1}
                    value={res_temp}
                    onChange={this.handleThinking}
                    style={{height: '30px'}}
                  />
                </ListItem>
                <ListItem>
                  <p>手もとに残るポイント</p>
                  <Avatar
                    backgroundColor={pink400}
                    size={50}
                    style={{margin: 5}}
                  >
                    {inv_final * game_rate - res_temp}
                  </Avatar>ポイント
                </ListItem>
                <ListItem>
                  <p>相手に渡すポイント</p>
                  <Avatar
                    backgroundColor={blue400}
                    size={50}
                    style={{margin: 5}}
                  >
                    {res_temp}
                  </Avatar>ポイント
                </ListItem>
              </List>
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
