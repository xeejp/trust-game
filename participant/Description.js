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
        <CardTitle title="独裁者ゲーム" subtitle="ルールの説明" />
        <CardText>
          <p>あなたは誰かとペアになって実験を行います。<br/>参加者には2つの役割があり、今回は{game_round-1}回の役割交代があります。</p>
          <List>
            <ListItem
              primaryText="独裁者"
              secondaryText="独裁者はポイントを自分と受け手の間でどう分けるか決定できます"
            />
            <ListItem
              primaryText="受け手"
              secondaryText="受け手は提案者の提案を承認します。"
            />
          </List> 
        </CardText>
      </Card>
    )
  }
}
export default connect(mapStateToProps)(Description)
