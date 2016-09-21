import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Card, CardText, CardTitle } from 'material-ui/Card'
import CircularProgress from 'material-ui/CircularProgress'

import { getGamemodeName } from 'util/index'

const mapStateToProps = ({ participants_length }) => ({
  participants_length,
})

const Waiting = ({ participants_length }) => (
  <Card>
    <CardTitle title="信頼ゲーム" subtitle="待機画面" />
    <CardText>
      <p>参加者の登録を待っています。</p>
      <p>この画面のまましばらくお待ち下さい。</p>
      <p>現在{participants_length}人が参加しています。 </p>
    </CardText>
    <div style={{textAlign: "center"}}>
      <CircularProgress size={2}/>
    </div>
  </Card>
)

export default connect(mapStateToProps)(Waiting)
