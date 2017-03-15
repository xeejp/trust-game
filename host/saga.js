import { put, take, call, select, fork } from 'redux-saga/effects'

import { delay } from "redux-saga";

import {
  fetchContents,
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

function* matchSaga() {
  while (true) {
    yield take(`${match}`)
    yield call(sendData, 'MATCH')
  }
}

function* changePageSaga() {
  while (true) {
    const { payload } = yield take(`${changePage}`)
    sendData('CHANGE_PAGE', payload)
    if (payload == 'description') {
      yield put(match())
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
  yield fork(changePageSaga)
  yield fork(changeGameRoundSaga)
  yield fork(changeGameRateSaga)
  yield fork(changeGamePointSaga)
}

export default saga
