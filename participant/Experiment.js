import React, { Component } from 'react'
import { connect } from 'react-redux'

import Chip from 'material-ui/chip'
import Snackbar from 'material-ui/Snackbar'

import Allocating from './componets/Allocating.js'
import Judging from './componets/Judging.js'
import Finished from './componets/Finished.js'

import {
  fallSnackBarFlags,
  fallSnackBarFlags2,
  fallSnackBarFlags3,
} from './actions.js'

import {
  getRoleName,
} from 'util/index'

const mapStateToProps = ({
  state, role, allo_result,
  game_round, now_round,
  point, game_progress,
  responsedOK, responseOK,
  responsedNG, responseNG,
  changeRole,
}) => ({
  state, role, allo_result,
  game_round, now_round,
  point, game_progress,
  responsedOK, responseOK, 
  responsedNG, responseNG,
  changeRole,
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
    const { state } = this.props
    switch(state) {
      case "allocating":
        return <Allocating />
      case "judging":
        return <Judging />
      case "finished":
        return  <Finished />
    }
  }

  render() {
    const {
      role, game_round,
      now_round, point,
      game_progress, allo_result,
      responsedOK, responseOK,
      responsedNG, responseNG,
      changeRole, state,
    } = this.props
    return (
      role != "visitor"?
        <div>
        { state != "finished"?
            <span>
              <Chip style={styles.chip1}>ラウンド: {now_round} / {game_round}</Chip>
              <Chip style={styles.chip1}>{(game_round - now_round) == 0? "最後のラウンド": "残り役割交代: " + (game_round - now_round) + "回"}</Chip>
            </span>
          : <span />
        }
        { state == "finished"?
            <span><Chip style={styles.chip2}>参加者全体の進捗: {Math.round(game_progress)} %</Chip></span>
          : <span />
        }
        <Chip style={styles.chip2}>ポイント: {point}</Chip>
        <div style={styles.contents}>{this.renderContents()}</div>
          <Snackbar
            open={changeRole}
            message={"役割交換によりあなたは" + getRoleName(role) + "になりました。"}
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose2}
          />
          <Snackbar
            open={responsedOK}
            message={"さきほどの提案は承認されました。" + allo_result + "ポイント獲得しました。"}
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose}
          />
          <Snackbar
            open={responseOK}
            message={"提案を承認しました。" + (1000 - allo_result) + "ポイント獲得しました。"}
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose}
          />
        </div>
      :
        <p>参加できませんでした。終了をお待ち下さい。</p>
    )
  }
}

export default connect(mapStateToProps)(Respond)


