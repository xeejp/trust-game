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

import { ReadJSON, InsertVariable } from '../../util/ReadJSON'

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
              title={ReadJSON().static_text["role_investor"]}
              subtitle={ReadJSON().static_text["return_wait"]}
            />
            <CardText>
              <List>
                <ListItem>
                  <PassPoint
                    point={inv_final}
                    text={ReadJSON().static_text["passed_point"]}
                    rate={game_rate}
                  />
                </ListItem>
                <ListItem>
                  <HoldPoint
                    point={game_point - inv_final}
                    text={ReadJSON().static_text["remained_point"]}
                  />
                </ListItem>
              </List>
              <span style={{display: "flex", flexWrap: "wrap"}}>
                <Chip style={{margin: 4}}>{res_temp? ReadJSON().static_text["partner_input"] : ReadJSON().static_text["partner_wait"]}</Chip>
              </span>
            </CardText>
          </Card>
        :
          <Card>
            <CardHeader
              title={ReadJSON().static_text["role_responder"]}
              subtitle={ReadJSON().static_text["respond_point"]}
            />
            <CardText>
              <List>
                <ListItem>
                  <PassPoint
                    text={ReadJSON().static_text["reveive_point"]}
                    point={inv_final}
                    rate={game_rate}
                  />
                </ListItem>
                <ListItem>
                  <span style={{margin: 4}}>
                    <div style={{ position: "relative", marginBottom: "5%"}}>
                      <h4 style={{ position: "absolute",  left: "1%", backgroundColor: "rgba(255,255,255,0.5)", pointerEvents: "none" }}>{InsertVariable(ReadJSON().static_text["remain_point_v"], { point: Math.round((inv_final * game_rate - res_temp) * 10) / 10 })}</h4>
                      <h4 style={{ position: "absolute", right: "1%", backgroundColor: "rgba(255,255,255,0.5)", pointerEvents: "none" }}>{InsertVariable(ReadJSON().static_text["pass_point_v"], { point: Math.round((res_temp) * 10) / 10 })}</h4>
                      <div style={{ clear: "both" }}></div>
                      <Slider
                        divisor={10}
                        min={0}
                        max={inv_final * game_rate}
                        step={1}
                        value={res_temp}
                        onChange={this.handleThinking}
                        style={{height: '30px'}}
                      />
                    </div>
                  </span>
                </ListItem>
                <ListItem>
                  <HoldPoint
                    point={inv_final * game_rate - res_temp}
                    text={ReadJSON().static_text["remain_point"]}
                  />
                </ListItem>
                <ListItem>
                  <PassPoint
                    point={res_temp}
                    text={ReadJSON().static_text["pass_point"]}
                  />
                </ListItem>
              </List>
            </CardText>
            <CardActions>
              <RaisedButton
                label={ReadJSON().static_text["confirm"]}
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
