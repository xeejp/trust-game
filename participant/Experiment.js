import React, { Component } from 'react'
import { connect } from 'react-redux'

import Chip from 'material-ui/chip'
import Snackbar from 'material-ui/Snackbar'

import Finished from './componets/Finished.js'
import Investing from './componets/Investing.js'
import Responding from './componets/Responding.js'
import Notice from './Notice.js'

import {
  noticeRoleChanged,
  fallSnackBarFlags,
  fallSnackBarFlags2,
} from './actions.js'

import {
  getRoleName,
} from 'util/index'

const mapStateToProps = ({
  pair_state, role,
  game_round, pair_round,
  point, game_progress,
  change_role_flag,
  invested_flag, responded_flag,
  inv_final, res_final,
}) => ({
  pair_state, role,
  game_round, pair_round,
  point, game_progress,
  change_role_flag,
  invested_flag, responded_flag,
  inv_final, res_final,
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

  componentWillReceiveProps(props) {
    if (props.role !== this.props.role && props.role === "investor") {
      this.props.dispatch(noticeRoleChanged())
    }
  }

  render() {
    const {
      role, game_round,
      pair_round, point,
      game_progress,
      change_role_flag, pair_state,
      invested_flag, responded_flag,
      inv_final, res_final,
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
        <Chip style={styles.chip2}>累計ポイント: {point}</Chip>
        <div style={styles.contents}>{this.renderContents()}</div>
          <Snackbar
            open={invested_flag}
            message={inv_final + "ポイント" + (role=="investor"? "を投資しました。応答をお待ち下さい。" : "が投資されました。返却ポイントを決定してください。")}
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose}
          />
          <Snackbar
            open={responded_flag}
            message={res_final + "ポイント" + (role=="investor"? "を返却しました。" : "が返却されました。")}
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose}
          />
          <Notice
            open={change_role_flag}
            message={"役割交代によりあなたは" + getRoleName(role) + "になりました。実験を続けてください。"}
            onRequestClose={this.handleRequestClose2}
          />
        </div>
      :
        <p>参加できませんでした。終了をお待ち下さい。</p>
    )
  }
}

export default connect(mapStateToProps)(Respond)


