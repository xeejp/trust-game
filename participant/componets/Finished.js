import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'

import {
  getRoleName,
} from 'util/index'

import { ReadJSON } from '../../util/ReadJSON'

const mapStateToProps = ({ role }) => ({
  role
})
const Finished = ({ role }) => (() => {
  return (
    <div>
    <Card>
    <CardHeader
    title={getRoleName(role)}
    subtitle={ReadJSON().static_text["wait_end"]}
      />
    <CardText>
    <p>{ReadJSON().static_text["end_text"]}</p>
    </CardText>
    </Card>
    </div>
  )

})()

export default connect(mapStateToProps)(Finished)
