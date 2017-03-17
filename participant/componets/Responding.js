import React, { Component } from 'react'
import { connect } from 'react-redux'

import Chip from 'material-ui/chip';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import Avatar from 'material-ui/Avatar'
import List from 'material-ui/List/List'
import ListItem from 'material-ui/List/ListItem'

import HoldPoint from '../HoldPoint.js'
import PassPoint from '../PassPoint.js'

import { getRoleName } from 'util/index'

import {
  syncResTemp,
  finishResponding,
} from '../actions.js'
import { Slider } from 'xee-components'

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
    const { role, inv_final, res_temp, game_rate, game_point } = this.props
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
                  <PassPoint
                    point={inv_final}
                    text='相手が受け取ったポイント'
                    rate={game_rate}
                  />
                </ListItem>
                <ListItem>
                  <HoldPoint
                    point={game_point - inv_final}
                    text='手もとに残ったポイント'
                  />
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
                  <PassPoint
                    text='相手から受け取ったポイント'
                    point={inv_final}
                    rate={game_rate}
                  />
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
                  <HoldPoint
                    point={inv_final * game_rate - res_temp}
                    text='手もとに残るポイント'
                  />
                </ListItem>
                <ListItem>
                  <PassPoint
                    point={res_temp}
                    text='相手に渡すポイント'
                  />
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
