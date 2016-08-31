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
      <p>参加者の登録を待っています。現在の参加者: {participants_length}人</p>
      <p>この画面のまましばらくお待ち下さい。</p>
    </CardText>
    <div style={{textAlign: "center"}}>
      <CircularProgress size={2}/>
    </div>
  </Card>
)

export default connect(mapStateToProps)(Waiting)
