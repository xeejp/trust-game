import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  fetchContents,
  intoLoading,
  exitLoading,
} from './actions.js'

import FlatButton from 'material-ui/FlatButton';

import PageSteps from './PageSteps.js'
import Users from './Users.js'
import Chart from '../components/Chart.js'
import ExperimentSetting from './ExperimentSetting'
import EditQuestion from  './EditQuestion'
import DownloadButton from './DownloadButton'

import throttle from 'react-throttle-render'

const ThrottledChart = throttle(Chart, 100)

const mapStateToProps = ({ dispatch ,game_page}) => ({
  dispatch ,game_page
})

class App extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(intoLoading())
    dispatch(fetchContents())
    dispatch(exitLoading())
  }

  render() {
    const { game_page } = this.props
    return (
      <div>
        <PageSteps />
        <Users />
        <ThrottledChart />
        <ExperimentSetting />
        <EditQuestion 
          style={{marginLeft: "2%"}} 
          disabled={game_page != "waiting"}
        />
        <DownloadButton 
            style={{marginLeft: "2%"}}
            disabled={game_page != "result"}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps)(App)
