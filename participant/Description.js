import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Card, CardText, CardTitle } from 'material-ui/Card'
import {List, ListItem} from 'material-ui/List'
import { getGamemodeName } from 'util/index'

import { ReadJSON } from '../util/ReadJSON'

const mapStateToProps = ({ question, game_round, game_rate, game_point }) => ({
  question,
  game_round,
  game_rate,
  game_point,
})

class Description extends Component {
  render() {
    const { question, game_round, game_rate, game_point } = this.props
    return (
      <Card>
        <CardTitle title={ReadJSON().static_text["title"]} subtitle={ReadJSON().static_text["desc"]} />
        <CardText>
          <p>{question}</p>
        </CardText>
      </Card>
    )
  }
}
export default connect(mapStateToProps)(Description)
