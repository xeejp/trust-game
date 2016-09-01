import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card'
import Slider from 'material-ui/Slider'
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import Toggle from 'material-ui/Toggle';

import { changeGameRound, changeGamePoint, changeGameRate } from './actions.js'

const mapStateToProps = ({ game_round, game_page, game_point, game_rate }) => ({
  game_round,
  game_page,
  game_point,
  game_rate,
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
    this.handlePointInc = this.handlePointInc.bind(this)
    this.handlePointDec = this.handlePointDec.bind(this)
    this.handleRateInc = this.handleRateInc.bind(this)
    this.handleRateDec = this.handleRateDec.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleConfirm = this.handleConfirm.bind(this)
    this.state = {
      open: false,
      game_round_temp: 1,
      game_point: 10,
      game_rate: 3,
    }
  }
  componentDidMount() {
    const { game_round, game_point, game_rate } = this.props
    this.setState({
      game_round_temp: game_round,
      game_point_temp: game_point,
      game_rate_temp: game_rate,
    })
  }

  handleOpen = () => {
    this.setState({open: true})
    const { game_round, game_rate, game_point, game_page } = this.props
    this.setState({
      game_round_temp: game_round,
      game_point_temp: game_point,
      game_rate_temp: game_rate,
    })
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleConfirm = () => {
    const { dispatch } = this.props
    const { game_round_temp, game_rate_temp, game_point_temp } = this.state
    dispatch(changeGameRound(game_round_temp))
    dispatch(changeGamePoint(game_point_temp))
    dispatch(changeGameRate(game_rate_temp))
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

  handlePointInc = (event) => {
    const { game_point_temp } = this.state
    this.setState({game_point_temp: game_point_temp + 1})
  }

  handlePointDec = (event) => {
    const { game_point_temp } = this.state
    this.setState({game_point_temp: game_point_temp - 1})
  }

  handleRateInc = (event) => {
    const { game_rate_temp } = this.state
    this.setState({game_rate_temp: game_rate_temp + 1})
  }

  handleRateDec = (event) => {
    const { game_rate_temp } = this.state
    this.setState({game_rate_temp: game_rate_temp - 1})
  }

  render() {
    const { game_page } = this.props
    const { game_round_temp, game_rate_temp, game_point_temp } = this.state
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
          <p>仲介者のレート: {game_rate_temp}倍</p>
          { game_rate_temp != 1?
            <RaisedButton
              label="-"
              style={styles.game_roundButton}
              onClick={this.handleRateDec}
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
            onClick={this.handleRateInc}
          />
          <p>初めに配れるポイント: {game_point_temp}ポイント</p>
          { game_point_temp != 1?
            <RaisedButton
              label="-"
              style={styles.game_roundButton}
              onClick={this.handlePointDec}
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
            onClick={this.handlePointInc}
          />
        </Dialog>
      </span>
    );
  }
}

export default connect(mapStateToProps)(ExperimentSetting)
