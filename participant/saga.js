import { put, take, call, select, fork } from 'redux-saga/effects'

import {
  fetchContents,
  syncInvTemp,
  finishInvesting,
  syncResTemp,
  finishResponding,
} from './actions.js'

function* fetchContentsSaga() {
  while(true) {
    yield take(`${fetchContents}`)
    sendData('FETCH_CONTENTS')
  }
}

function* syncInvTempSaga() {
  while(true) {
    const { payload } = yield take(`${syncInvTemp}`)
    sendData('SYNC_INV_TEMP', payload)
  }
}

function* finishInvestingSaga() {
  while(true) {
    const { payload } = yield take(`${finishInvesting}`)
    sendData('FINISH_INVESTING', payload)
  }
}
function* syncResTempSaga() {
  while(true) {
    const { payload } = yield take(`${syncResTemp}`)
    sendData('SYNC_RES_TEMP', payload)
  }
}

function* finishRespondingSaga() {
  while(true) {
    const { payload } = yield take(`${finishResponding}`)
    sendData('FINISH_RESPONDING', payload)
  }
}

function* saga() {
  yield fork(fetchContentsSaga)
  yield fork(syncInvTempSaga)
  yield fork(finishInvestingSaga)
  yield fork(syncResTempSaga)
  yield fork(finishRespondingSaga)
}

export default saga
