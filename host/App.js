import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  fetchContents,
  intoLoading,
  exitLoading,
  changePage,
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

const mapStateToProps = ({ dispatch ,game_page, pairs }) => ({
  dispatch, game_page, pairs
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

  componentWillReceiveProps({ pairs, game_page }) {
    if(game_page == "experiment") {
      for(var key in pairs) {
        if(pairs[key].pair_state != "finished") return
      }
      const { dispatch } = this.props
      dispatch(changePage("result"))
    }
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
