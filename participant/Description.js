import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Card, CardText, CardTitle } from 'material-ui/Card'
import {List, ListItem} from 'material-ui/List'
import { getGamemodeName } from 'util/index'

import { ReadJSON, InsertVariable, LineBreak } from '../util/ReadJSON'

const mapStateToProps = ({ dynamic_text, game_round, game_rate, game_point }) => ({
  dynamic_text,
  game_round,
  game_rate,
  game_point,
})

class Description extends Component {
  render() {
    const { dynamic_text, game_round, game_rate, game_point } = this.props
    return (
      <Card>
        <CardTitle title={ReadJSON().static_text["title"]} subtitle={ReadJSON().static_text["desc"]} />
        <CardText>
          <p>{LineBreak(InsertVariable(dynamic_text["description"][1], { round: game_round, point: game_point, rate: game_rate  }))}</p>
        </CardText>
      </Card>
    )
  }
}
export default connect(mapStateToProps)(Description)
