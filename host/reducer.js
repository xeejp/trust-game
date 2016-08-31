import concatenateReducers from 'redux-concatenate-reducers'
import { handleAction, handleActions } from 'redux-actions'

import {
  game_modes,
  pages,
  roles,
  states,
} from 'util/index'

import {
  changeChartRound,
  fallChartButton,
  changePage,
  changeGameRound,
  reset,
  intoLoading,
  exitLoading,
} from './actions.js'

const initialState = {
  participants: {},
  pairs: {},
  loading: true,
  dictator_results: {},
  chart_round: 1,
  chart_button: false,
}

const reducer = concatenateReducers([
  handleActions({
    'sync game progress': ({}, { payload }) => ({ game_progress: payload }),
    [intoLoading]: ({}) => ({ loading: true }),
    [exitLoading]: ({}) => ({ loading: false }),
    'update contents': (_, { payload }) => payload,
    'finish allocating': ( { pairs } , { payload }) => ({
      pairs: Object.assign({}, pairs, {
        [payload]: Object.assign({}, [payload], {
          state: "judging",
          now_round: pairs[payload].now_round
        })
      })
    }),
    'join': ({ participants }, { payload: { id, participant } }) => ({
      participants: Object.assign({}, participants, {
        [id]: participant
      })
    }),
    'reseted': (_, { payload: { participants }}) => ({participants: participants}),
    [reset]: ({}) => ({
      page: "waiting",
      game_round: 1, game_round_temp: 1,
      pairs: {},
      dictator_results: {},
    }),
    'matched': (_, { payload: { participants, pairs } }) => ({
      participants, pairs
    }),
    [changeChartRound]: (_, { payload }) => ({ chart_round: payload, chart_button: true}),
    [fallChartButton]: () => ({ chart_button: false}),
    [changePage]: (_, { payload }) => ({
        page: payload,
        game_progress: 0,
    }),
    [changeGameRound]: (_, { payload }) => ({ game_round: payload }),
    'push results': ({ game_mode, game_round, participants, pairs },
    { payload: { dictator_results, id, target_id, pair_id, result: {value}}}) => ({
      dictator_results: dictator_results,
      participants: Object.assign({}, participants, {
        [id]: Object.assign({}, participants[id], {
          point: participants[id].point + value,
          role: (pairs[participants[id].pair_id].now_round < game_round)?
          participants[target_id].role : participants[id].role
        }),
        [target_id]: Object.assign({}, participants[target_id], {
          point: participants[target_id].point + (1000 - value),
          role: (pairs[participants[id].pair_id].now_round < game_round)?
          participants[id].role : participants[target_id].role
        })
      }),
      pairs: Object.assign({}, pairs, {
        [participants[id].pair_id]: Object.assign({}, pairs[participants[id].pair_id], {
          state: (pairs[participants[id].pair_id].now_round < game_round)? "allocating" : "finished",
          now_round: (pairs[participants[id].pair_id].now_round < game_round)?
          pairs[participants[id].pair_id].now_round + 1 : pairs[participants[id].pair_id].now_round,
        })
      })
    }),
  }, initialState),
])

export default reducer
