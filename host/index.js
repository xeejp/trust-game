import React, { Component } from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { take, call, fork } from 'redux-saga/effects'
import { Provider } from 'react-redux'
import createLogger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import App from './App.js'

import saga from './saga'
import reducer from './reducer'
import { openParticipantPage } from './actions'

const logger = createLogger();
const sagaMiddleware = createSagaMiddleware()

let middlewares = [sagaMiddleware, logger]

const store = createStore(
  reducer,
  applyMiddleware(...middlewares)
)

// Saga
function* openParticipantPageSaga() {
  while (true) {
    const { payload: id } = yield take(`${openParticipantPage}`)
    yield call(_experiment.openParticipantPage.bind(_experiment), id)
  }
}

function* hostSaga() {
  yield fork(saga)
  yield fork(openParticipantPageSaga)
}

sagaMiddleware.run(hostSaga)

var _experiment = new Experiment(_topic, _token);

_experiment.onReceiveMessage(({ action }) => {
  store.dispatch(action)
})

function sendData(action, params=null) {
  _experiment.send_data({ action, params });
}

window.sendData = sendData

render(
  <Provider store={store}>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("content")
)
