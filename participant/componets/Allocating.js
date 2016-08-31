import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import Slider from 'material-ui/Slider'
import RaisedButton from 'material-ui/RaisedButton';

import { getRoleName } from '../../util/index.js'

import {
  submitAlloTemp,
  finishAllocating,
} from '../actions.js'

const mapStateToProps = ({ allo_temp, role }) => ({
  allo_temp,
  role,
})

class Allocating extends Component {
  constructor() {
    super()
    this.handleThinking = this.handleThinking.bind(this)
    this.handleConfirm = this.handleConfirm.bind(this)
  }

  handleThinking = (event, value) => {
    const { dispatch } = this.props
    dispatch(submitAlloTemp(value))
  }

  handleConfirm = (event, value) => {
    const { dispatch, allo_temp } = this.props
    dispatch(finishAllocating(allo_temp))
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
            title={"あなたは" + getRoleName(role) + "側です"}
            subtitle={role == "responder"? getRoleName(enemy) + "が配分中。しばらくお待ちください。" : "配分してください。"}
          />
          <CardText>
            <p>あなたへの配分: {role == "responder"? 1000 - allo_temp : allo_temp}  {getRoleName(enemy)}への配分: {role == "responder"? allo_temp : 1000 - allo_temp}</p>
            <Slider
              min={0}
              max={1000}
              step={100}
              value={ role == "responder"? 1000 - allo_temp : allo_temp }
              onChange={this.handleThinking}
              disabled={role == "responder"}
            />
            <RaisedButton
              label="送信"
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

export default connect(mapStateToProps)(Allocating)
