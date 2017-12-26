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
    return (
      <Card>
        <CardTitle title={"信頼ゲーム"} subtitle={"ルール説明"} />
        <CardText>
          <p>{question}</p>
        </CardText>
      </Card>
    )
  }
}
export default connect(mapStateToProps)(Description)
