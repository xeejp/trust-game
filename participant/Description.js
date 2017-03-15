import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Card, CardText, CardTitle } from 'material-ui/Card'
import {List, ListItem} from 'material-ui/List'
import { getGamemodeName } from 'util/index'

const mapStateToProps = ({ question, game_round, game_rate, game_point }) => ({
  question,
  game_round,
  game_rate,
  game_point,
})

class Description extends Component {
  render() {
    const { question, game_round, game_rate, game_point } = this.props
    const text = question
      .replace('{round}', game_round-1)
      .replace('{point}', game_point)
      .replace('{rate}', game_rate)
    return (
      <Card>
        <CardText>
          <div dangerouslySetInnerHTML={{__html: text}} />
        </CardText>
      </Card>
    )
  }
}
export default connect(mapStateToProps)(Description)
