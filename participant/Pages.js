import React, { Component } from 'react'
import { connect } from 'react-redux'

import Waiting from './Waiting'
import Description from './Description'
import Experiment from './Experiment'
import Result from './Result'

const mapStateToProps = ({ game_page }) => ({
  game_page
})

const Pages = ({ game_page }) => (() => {
  switch (game_page) {
    case "waiting":
      return <Waiting />
    case "description":
      return <Description />
    case "experiment":
      return <Experiment />
    case "result":
      return <Result />
    default:
      return <span></span>
  }
})()

export default connect(mapStateToProps)(Pages)
