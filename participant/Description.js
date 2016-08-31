import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Card, CardText, CardTitle } from 'material-ui/Card'
import {List, ListItem} from 'material-ui/List'
import { getGamemodeName } from 'util/index'

const mapStateToProps = ({ game_round}) => ({
  game_round
})

class Description extends Component {
  render() {
    const { game_round } = this.props
    return (
      <Card>
        <CardTitle title="信頼ゲーム" subtitle="ルールの説明" />
        <CardText>
          <p>あなたは誰かとペアになって実験を行います。<br/>参加者には2つの役割があり、今回は{game_round-1}回の役割交代があります。</p>
          <List>
            <ListItem
              primaryText="投資者"
              secondaryText="ポイントをどれだけ相手に投資するか決定できます。"
            />
            <ListItem
              primaryText="応答者"
              secondaryText="ポイントをどれだけ相手に返すか決定できます。"
            />
          </List> 
        </CardText>
      </Card>
    )
  }
}
export default connect(mapStateToProps)(Description)
