import React, { Component } from 'react'
import { connect } from 'react-redux'

import Chip from 'material-ui/chip'
import Snackbar from 'material-ui/Snackbar'

import Finished from './componets/Finished.js'
import Investing from './componets/Investing.js'
import Responding from './componets/Responding.js'

import {
  fallSnackBarFlags,
  fallSnackBarFlags2,
} from './actions.js'

import {
  getRoleName,
} from 'util/index'

const mapStateToProps = ({
  pair_state, role, allo_result,
  game_round, pair_round,
  point, game_progress,
  change_role_flag,
}) => ({
  pair_state, role, allo_result,
  game_round, pair_round,
  point, game_progress,
  change_role_flag,
})

const styles = {
  chip1: {
    margin: 4,
    float: "left"
  },
  chip2: {
    margin: 4,
    float: "right"
  },
  contents: {
    clear: "both"
  }
}

class Respond extends Component {
  constructor() {
    super()
    this.handleRequestClose = this.handleRequestClose.bind(this)
    this.handleRequestClose2 = this.handleRequestClose2.bind(this)
    this.handleRequestClose3 = this.handleRequestClose3.bind(this)
  }

  handleRequestClose = () => {
    const { dispatch } = this.props
    dispatch(fallSnackBarFlags())
  }

  handleRequestClose2 = () => {
    const { dispatch } = this.props
    dispatch(fallSnackBarFlags2())
  }

  handleRequestClose3 = () => {
    const { dispatch } = this.props
    dispatch(fallSnackBarFlags3())
  }

  renderContents () {
    const { pair_state } = this.props
    switch(pair_state) {
      case "investing":
        return <Investing />
      case "responding":
        return <Responding />
      case "finished":
        return  <Finished />
    }
  }

  render() {
    const {
      role, game_round,
      pair_round, point,
      game_progress, allo_result,
      change_role_flag, pair_state,
    } = this.props
    return (
      role != "visitor"?
        <div>
        { pair_state != "finished"?
            <span>
              <Chip style={styles.chip1}>ラウンド: {pair_round} / {game_round}</Chip>
              <Chip style={styles.chip1}>{(game_round - pair_round) == 0? "最後のラウンド": "残り役割交代: " + (game_round - pair_round) + "回"}</Chip>
            </span>
          : <Chip style={styles.chip2}>参加者全体の進捗: {Math.round(game_progress)} %</Chip>
        }
        <Chip style={styles.chip2}>ポイント: {point}</Chip>
        <div style={styles.contents}>{this.renderContents()}</div>
          <Snackbar
            open={change_role_flag}
            message={"役割交換によりあなたは" + getRoleName(role) + "になりました。"}
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose2}
          />
        </div>
      :
        <p>参加できませんでした。終了をお待ち下さい。</p>
    )
  }
}

export default connect(mapStateToProps)(Respond)


