import React, { Component } from 'react'
import { connect } from 'react-redux'

import Chip from 'material-ui/chip';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton';
import List from 'material-ui/List/List'
import ListItem from 'material-ui/List/ListItem'
import { Slider } from 'xee-components'

import { getRoleName } from '../../util/index.js'
import HoldPoint from '../HoldPoint.js'
import PassPoint from '../PassPoint.js'
import {
  syncInvTemp,
  finishInvesting,
} from '../actions.js'

import { ReadJSON } from '../../util/ReadJSON'

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
            title={ReadJSON().static_text["role_investor"]}
            subtitle={ReadJSON().static_text["invest_point"]}
          />
          <CardText>
            <List>
              <ListItem>
                <HoldPoint
                  point={game_point - inv_temp}
                  text={ReadJSON().static_text["remain_point"]}
                />
              </ListItem>
              <ListItem>
                <PassPoint
                  point={inv_temp}
                  text={ReadJSON().static_text["pass_point"]}
                />
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
              label={ReadJSON().static_text["confirm"]}
              primary={true}
              style={style}
              onClick={this.handleConfirm}
            />
          </CardActions>
        </Card>
        :
        <Card>
          <CardHeader
            title={ReadJSON().static_text["role_respoinder"]}
            subtitle={ReadJSON().static_text["wait_text"]}
          />
          <CardText>
            <span style={{margin: 8}}>
              <Chip style={{float: "left"}}>{inv_temp? ReadJSON().static_text["partner_input"] : ReadJSON().static_text["partner_wait"]}</Chip>
            </span>
          </CardText>
        </Card>
        }
      </div>
    )
  }
}

export default connect(mapStateToProps)(Investing)
