import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'

import {
  getRoleName,
} from 'util/index'

const mapStateToProps = ({ role }) => ({
  role
})
const Finished = ({ role }) => (() => {
  return (
    <div>
    <Card>
    <CardHeader
    title={getRoleName(role)}
    subtitle="終了待機"
      />
    <CardText>
    <p>あなたの実験は終了しました。他のペアが終了するまでこのままお待ち下さい。</p>
    </CardText>
    </Card>
    </div>
  )

})()

export default connect(mapStateToProps)(Finished)
