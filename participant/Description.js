import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Card, CardText, CardTitle } from 'material-ui/Card'
import {List, ListItem} from 'material-ui/List'
import { getGamemodeName } from 'util/index'

const mapStateToProps = ({ game_round, game_rate, game_point }) => ({
  game_round,
  game_rate,
  game_point,
})

class Description extends Component {
  render() {
    const { game_round, game_rate, game_point } = this.props
    return (
      <Card>
        <CardTitle title="信頼ゲーム" subtitle="ルールの説明" />
        <CardText>
          <p>あなたは誰かとペアになって実験を行います。<br/>
          参加者には2つの役割があり、今回は{game_round-1}回の役割交代があります。</p>
          <List>
            <ListItem
              primaryText="投資者"
              secondaryText="ポイントをどれだけ相手に投資するか決定できる"
            />
            <ListItem
              primaryText="応答者"
              secondaryText="ポイントをどれだけ相手に返すか決定できる"
            />
          </List> 
          <p>はじめに投資者に{game_point}ポイントが配られます。<br/>
          投資者が投資したポイントは仲介者が{game_rate}倍にして応答者に送られます。<br/>
          応答者が投資者に返すポイントを決定したらそのラウンドは終了し、累計ポイントに加算されます。</p>
        </CardText>
      </Card>
    )
  }
}
export default connect(mapStateToProps)(Description)
