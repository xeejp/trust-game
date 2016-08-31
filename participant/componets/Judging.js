import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import Slider from 'material-ui/Slider'
import RaisedButton from 'material-ui/RaisedButton';

import { getRoleName } from 'util/index'

import {
  submitAlloTemp,
  finishAllocating,
} from '../actions.js'

const mapStateToProps = ({ allo_temp, change_count, role, now_round }) => ({
  allo_temp, change_count, role, now_round,
})

import {
  responseOK,
} from '../actions.js'

class Allocating extends Component {
  constructor() {
    super()
    this.handleOK = this.handleOK.bind(this)
  }

  handleOK = () => {
    const { dispatch, allo_temp, change_count, now_round } = this.props
    const result = {
      value: allo_temp,
      change_count: change_count,
      now_round: now_round,
    }
    dispatch(responseOK(result))
  }

  render() {
    const { allo_temp, role } = this.props
    const style = {
      margin: 12,
    }
    const enemy = (role == "responder")? "dictator" : "responder"
    return (
      <div>
        <Card>
          <CardHeader
            title={getRoleName(role) + "側"}
            subtitle={role == "responder"? "回答してください。" :"回答待ちです。しばらくお待ちください。"}
          />
          <CardText>
            <p>あなたへの配分: {role == "responder"? 1000 - allo_temp : allo_temp}  {getRoleName(enemy)}への配分: {role == "responder"? allo_temp : 1000 - allo_temp}</p>
            { role != "responder"?
              <p>送信しました。受け手の回答をお待ち下さい。</p>
            :
              <div>
                <p>{getRoleName(enemy) + "が上記のように提案してきました。回答してください"}</p>
                <RaisedButton
                  label="承認"
                  primary={true}
                  onClick={this.handleOK}
                  style={{marginRight: "16px"}}
                />
                <RaisedButton
                  label="拒否"
                  secondary={true}
                  disabled={true}
                />
              </div>
            }
          </CardText>
        </Card>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Allocating)

