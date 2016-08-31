import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card'
import Slider from 'material-ui/Slider'
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import Toggle from 'material-ui/Toggle';

import { changeGameRound } from './actions.js'

const mapStateToProps = ({ game_round, game_page }) => ({
  game_round,
  game_page,
})

const styles = {
  block: {
    margin: '20px 20px'
  },
  game_roundButton: {
    margin: 12,
  },
};

class ExperimentSetting extends Component {
  constructor() {
    super()
    this.handleRoundInc = this.handleRoundInc.bind(this)
    this.handleRoundDec = this.handleRoundDec.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleConfirm = this.handleConfirm.bind(this)
    this.state = {
      open: false,
      game_round_temp: 1,
    }
  }
  componentDidMount() {
    const { game_round } = this.props
    this.setState({
      game_round_temp: game_round,
    })
  }

  handleOpen = () => {
    this.setState({open: true})
    const { game_round } = this.props
    this.setState({
      game_round_temp: game_round,
    })
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleConfirm = () => {
    const { dispatch } = this.props
    const { game_round_temp } = this.state
    dispatch(changeGameRound(game_round_temp))
    this.setState({open: false});
  }

  handleNothing = (event) => {}

  handleRoundInc = (event) => {
    const { game_round_temp } = this.state
    this.setState({game_round_temp: game_round_temp + 1})
  }

  handleRoundDec = (event) => {
    const { game_round_temp } = this.state
    this.setState({game_round_temp: game_round_temp - 1})
  }

  render() {
    const { game_page } = this.props
    const { game_round_temp } = this.state
    const actions = [
      <FlatButton
        label="キャンセル"
        secondary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="適用"
        primary={true}
        onTouchTap={this.handleConfirm}
      />,
    ];

    return (
      <span>
        { game_page == "waiting"?
          <RaisedButton label="実験設定"
            onTouchTap={this.handleOpen}
            style={{marginRight: "12px"}}
          />
        :
          <FlatButton label="実験設定"
            style={{marginRight: "12px"}}
            disabled={true}
          />
        }
        <Dialog
          title="実験設定"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <p>ゲームのラウンド数: {game_round_temp}回 (役割交換回数: {game_round_temp-1}回)</p>
          { game_round_temp != 1?
            <RaisedButton
              label="-"
              style={styles.game_roundButton}
              onClick={this.handleRoundDec}
            />
            :
            <FlatButton
              label="-"
              style={styles.game_roundButton}
            />
          }
          <RaisedButton
            label="+"
            style={styles.game_roundButton}
            onClick={this.handleRoundInc}
          />
        </Dialog>
      </span>
    );
  }
}

export default connect(mapStateToProps)(ExperimentSetting)
