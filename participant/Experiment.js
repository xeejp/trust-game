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

import { ReadJSON, InsertVariable } from '../util/ReadJSON'

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
              <Chip style={styles.chip1}>{InsertVariable(ReadJSON().static_text["pair_round"], { pair: pair_round, game: game_round})}</Chip>
              <Chip style={styles.chip1}>{(game_round - pair_round) == 0? ReadJSON().static_text["final_round"] : InsertVariable(ReadJSON().static_text["remain_round"], { round: game_round - pair_round })}</Chip>
            </span>
          : <Chip style={styles.chip2}>{InsertVariable(ReadJSON().static_text["progress"], { progress: Math.round(game_progress) })}</Chip>
        }
        <Chip style={styles.chip2}>{InsertVariable(ReadJSON().static_text["total_point"], { point: point })}</Chip>
        <div style={styles.contents}>{this.renderContents()}</div>
          <Snackbar
            open={invested_flag}
            message={InsertVariable(role=="investor"? ReadJSON().static_text["passed"] : ReadJSON().static_text["received"], { point: inv_final })}
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose}
          />
          <Snackbar
            open={responded_flag}
            message={InsertVariable(role=="investor"? ReadJSON().static_text["return"] : ReadJSON().static_text["returned"], { point: inv_final })}
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose}
          />
          <Notice
            open={change_role_flag}
            message={ReadJSON().static_text["role_change"]}
            onRequestClose={this.handleRequestClose2}
          />
        </div>
      :
        <p>{ReadJSON().static_text["cant_join"]}</p>
    )
  }
}

export default connect(mapStateToProps)(Respond)


