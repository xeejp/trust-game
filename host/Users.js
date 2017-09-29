import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import throttle from 'react-throttle-render'

import { Card, CardHeader, CardText } from 'material-ui/Card'
import { getRoleName, getStateName } from '../util/index.js'

import { openParticipantPage } from './actions'

const User = ({ id, role, point, pair_id, round, state, page, openParticipantPage }) => (
  <tr><td><a onClick={openParticipantPage(id)}>{id}</a></td>
  <td>{page != "waiting"? getRoleName(role) : "-"}</td>
  <td>{page != "waiting" && role != "visitor"? point : "-"}</td>
  <td>{page != "waiting" && role != "visitor"? pair_id : "-"}</td>
  <td>{round && page == "experiment"? round : "-"}</td>
  <td>{state && page == "experiment"? getStateName(state) : "-"}</td>
  </tr>
)

const UsersList = ({participants, pairs, page, openParticipantPage }) => (
  <table>
    <thead><tr><th>ID</th><th>役割</th><td>ポイント</td><td>所属ペアID</td><td>ラウンド</td><td>状態</td></tr></thead>
    <tbody>
      {
        Object.keys(participants).sort((id1, id2) => {
          if(participants[id1].pair_id > participants[id2].pair_id) return  1
          if(participants[id1].pair_id < participants[id2].pair_id) return -1
          if(participants[id1].role > participants[id2].role) return  1
          if(participants[id1].role < participants[id2].role) return -1
          return 0
        }).map(id => (
          <User
            key={id}
            id={id}
            role={participants[id].role}
            point={participants[id].point}
            pair_id={participants[id].pair_id}
            round={pairs[participants[id].pair_id]? pairs[participants[id].pair_id].pair_round : null}
            state={pairs[participants[id].pair_id]? pairs[participants[id].pair_id].pair_state : null}
            page={page}
            openParticipantPage={openParticipantPage}
          />
        ))
      }
    </tbody>
  </table>
)

const Pair = ({ id, pair_round, pair_state, game_round }) => (
  <tr><td>{id}</td><td>{pair_round} / {game_round}</td><td>{getStateName(pair_state)}</td></tr>
)

const Pairs = ({ pairs, participants, game_round}) => (
  <table>
    <thead><tr><th>ID</th><th>ラウンド</th><th>状況</th></tr></thead>
    <tbody>
      {
        Object.keys(pairs).map(id => (
          <Pair
            key={id}
            id={id}
            pair_round={pairs[id].pair_round}
            pair_state={pairs[id].pair_state}
            game_round={game_round}
          />
        ))
      }
    </tbody>
  </table>
)

const mapStateToProps = ({ pairs, participants, game_round, game_page }) => ({
  pairs, participants, game_round, game_page
})

const mapDispatchToProps = (dispatch) => {
  const open = bindActionCreators(openParticipantPage, dispatch)
  return {
    openParticipantPage: (id) => () => open(id)
  }
}

const Users = ({ pairs, participants, game_round, game_page, openParticipantPage }) => (
  <div>
    <Card style={{margin: '16px 16px'}}>
      <CardHeader
        title={"登録者 " + Object.keys(participants).length + "人"}
        actAsExpander={true}
        showExpandableButton={true}
      />
      <CardText expandable={true}>
        <UsersList
          participants={participants}
          pairs={pairs}
          page={game_page}
          openParticipantPage={openParticipantPage}
        />
      </CardText>
    </Card>
  </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(throttle(Users, 200))
