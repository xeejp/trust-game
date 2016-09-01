import { put, take, call, select, fork } from 'redux-saga/effects'

import { delay } from "redux-saga";

import {
  fetchContents,
  showResults,
  match,
  changePage,
  changeGameRound,
  changeGamePoint,
  changeGameRate,
} from './actions.js'

import {
  pages,
} from 'util/index'

function* fetchContentsSaga() {
  while(true) {
    yield take(`${fetchContents}`)
    sendData('FETCH_CONTENTS')
  }
}

function* syncGameProgressSaga() {
  while(true) {
    yield delay(2000)
    const game_page = yield select(({ game_page }) => game_page )
    if(game_page == "experiment"){
      const pairs = yield select(({pairs}) => pairs)
      const pairs_length = Object.keys(pairs).length
      const finished_pairs = Object.keys(pairs).filter(pair_id => pairs[pair_id].state == "finished").length
      sendData('SYNC_GAME_PROGRESS', Math.round(100 * finished_pairs / pairs_length))
    }
  }
}

function* syncParticipantsLengthSaga() {
  while(true) {
    yield delay(2000)
    const game_page = yield select(({ game_page }) => game_page )
    if(game_page == "waiting"){
      const participants = yield select(({participants}) => participants)
      sendData('SYNC_PARTICIPANTS_LENGTH', Object.keys(participants).length)
    }
  }
}

function* matchSaga() {
  while (true) {
    yield take(`${match}`)
    yield call(sendData, 'MATCH')
  }
}

function* showResultsSaga() {
  while(true) {
    yield take(`${showResults}`)
    const results = yield select(({ trust_results }) => trust_results)
    sendData('SHOW_RESULTS', results)
  }
}

function* changePageSaga() {
  while (true) {
    const { payload } = yield take(`${changePage}`)
    sendData('CHANGE_PAGE', payload)
    if (payload == 'description') {
      yield put(match())
    }
    if (payload == 'result') {
      yield put(showResults())
    }
  }
}

function* changeGameRoundSaga() {
  while(true) {
    const { payload } = yield take(`${changeGameRound}`)
    sendData('CHANGE_GAME_ROUND', payload)
  }
}

function* changeGameRateSaga() {
  while(true) {
    const { payload } = yield take(`${changeGameRate}`)
    sendData('CHANGE_GAME_RATE', payload)
  }
}

function* changeGamePointSaga() {
  while(true) {
    const { payload } = yield take(`${changeGamePoint}`)
    sendData('CHANGE_GAME_POINT', payload)
  }
}

function* saga() {
  yield fork(fetchContentsSaga)
  yield fork(matchSaga)
  yield fork(syncParticipantsLengthSaga)
  yield fork(syncGameProgressSaga)
  yield fork(showResultsSaga)
  yield fork(changePageSaga)
  yield fork(changeGameRoundSaga)
  yield fork(changeGameRateSaga)
  yield fork(changeGamePointSaga)
}

export default saga
