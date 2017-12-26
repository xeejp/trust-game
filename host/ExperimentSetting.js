import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ActionSettings from 'material-ui/svg-icons/action/settings'
import Dialog from 'material-ui/Dialog';

import Counter from 'components/Counter'

import { changeGameRound, changeGameRate , changeGamePoint, visit } from './actions.js'

import { ReadJSON } from '../util/ReadJSON'

const mapStateToProps = ({ game_round, game_rate, game_point, game_page, isFirstVisit }) => ({  game_round,
  game_rate,
  game_point,
  game_page,
  isFirstVisit,
})

const styles = {
};

class ExperimentSetting extends Component {
  constructor() {
    super()
    this.handleRound = this.handleRound.bind(this)
    this.handleRate = this.handleRate.bind(this)
    this.handlePoint = this.handlePoint.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleConfirm = this.handleConfirm.bind(this)
    this.state = {
      open: false,
      game_round_temp: 0,
      game_rate: 0,
      game_point: 0,
    }
  }

  componentWillReceiveProps(props) {
    const { game_round, game_rate, game_point, isFirstVisit } = props
    if(isFirstVisit) {
      this.setState({
        open: true,
        game_round_temp: game_round,
        game_rate_temp: game_rate,
        game_point_temp: game_point,
      })
      const { dispatch } = this.props
      dispatch(visit())
    }
    else {
      this.setState({
        game_round_temp: game_round,
        game_rate_temp: game_rate,
        game_point_temp: game_point,
      })
    }
  }

  componentDidMount() {
    const { game_round, game_rate, game_point } = this.props
    this.setState({
      game_round_temp: game_round,
      game_rate_temp: game_rate,
      game_point_temp: game_point,
    })
  }

  handleOpen = () => {
    this.setState({open: true})
    const { game_round, game_rate, game_point } = this.props
    this.setState({
      game_round_temp: game_round,
      game_rate_temp: game_rate,
      game_point_temp: game_point,
    })
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleConfirm = () => {
    const { dispatch } = this.props
    const { game_round_temp, game_rate_temp, game_point_temp } = this.state
    dispatch(changeGameRound(game_round_temp))
    dispatch(changeGameRate(game_rate_temp))
    dispatch(changeGamePoint(game_point_temp));
    this.handleClose()
  }

  handleNothing = (event) => {}

  handleRound = (event) => {
    const value = event.target.value
    const numValue = parseInt(value,10)
    this.setState({game_round_temp: numValue})
  }

  handleRate = (event) => {
    const value = event.target.value
    const numValue = parseInt(value,10)
    this.setState({game_rate_temp: numValue})
  }

  handlePoint = (event) => {
    const value = event.target.value
    const numValue = parseInt(value,10)
    this.setState({game_point_temp: numValue})
  }

  render() {
    const { game_page, game_round, game_rate, game_point } = this.props
    const { game_round_temp, game_rate_temp, game_point_temp } = this.state
    const actions = [
      <RaisedButton
        label={ReadJSON().static_text["apply"]}
        primary={true}
        onTouchTap={this.handleConfirm}
        style={{marginRight: "10px",}}
      />,
      <RaisedButton
        label={ReadJSON().static_text["end"]}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <span>
          <FloatingActionButton
            onTouchTap={this.handleOpen}
            disabled={game_page != "waiting"}
          ><ActionSettings /></FloatingActionButton>
        <Dialog
          title={ReadJSON().static_text["setting"]}
          actions={actions}
          modal={true}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <Counter
            title={ReadJSON().static_text["game_round_num"]}
            value={game_round_temp}
            min={1}
            minTip={ReadJSON().static_text["min_round"]}
            changeHandle={this.handleRound}
          />
          <Counter
            title={ReadJSON().static_text["middle_rate"]}
            value={game_rate_temp}
            min={1}
            minTip={ReadJSON().static_text["min_rate"]}
            changeHandle={this.handleRate}
          />
          <Counter
            title={ReadJSON().static_text["start_rate"]}
            value={game_point_temp}
            min={1}
            minTip={ReadJSON().static_text["min_point"]}
            changeHandle={this.handlePoint}
          />
        </Dialog>
      </span>
    );
  }
}

export default connect(mapStateToProps)(ExperimentSetting)
