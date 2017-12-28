import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Card, CardText, CardTitle } from 'material-ui/Card'
import CircularProgress from 'material-ui/CircularProgress'

import { getGamemodeName } from 'util/index'

import { ReadJSON, InsertVariable } from '../util/ReadJSON'

const mapStateToProps = ({ participants_length }) => ({
  participants_length,
})

const Waiting = ({ participants_length }) => (
  <Card>
    <CardTitle title={ReadJSON().static_text["title"]} subtitle={ReadJSON().static_text["wait"][0]} />
    <CardText>
      <p>{ReadJSON().static_text["wait"][1]}</p>
      <p>{ReadJSON().static_text["wait"][2]}</p>
      <p>{InsertVariable(ReadJSON().static_text["wait"][3], { num: participants_length })}</p>
    </CardText>
    <div style={{textAlign: "center"}}>
      <CircularProgress size={2}/>
    </div>
  </Card>
)

export default connect(mapStateToProps)(Waiting)
