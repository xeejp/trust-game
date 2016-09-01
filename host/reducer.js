import concatenateReducers from 'redux-concatenate-reducers'
import { handleAction, handleActions } from 'redux-actions'

import {
  game_modes, pages, roles, states,
} from 'util/index'

import {
  changePage,
  changeGameRound,
  changeGamePoint,
  changeGameRate,
  changeChartRound,
  fallChartButton,
  reset,
  intoLoading,
  exitLoading,
} from './actions.js'

const initialState = {
  participants: {},
  pairs: {},
  loading: true,
  trust_results: {},
  chart_round: 1,
  chart_button: false,
}

const reducer = concatenateReducers([
  handleActions({
    'sync game progress': ({}, { payload }) => ({ game_progress: payload }),
    [changePage]: (_, { payload }) => ({ game_page: payload, game_progress: 0 }),
    [changeGameRound]: (_, { payload }) => ({ game_round: payload }),
    [changeGamePoint]: (_, { payload }) => ({ game_point: payload }),
    [changeGameRate]: (_, { payload }) => ({ game_rate: payload }),
    [intoLoading]: ({}) => ({ loading: true }),
    [exitLoading]: ({}) => ({ loading: false }),
    'update contents': (_, { payload }) => payload,
    'join': ({ participants }, { payload: { id, participant } }) => ({
      participants: Object.assign({}, participants, {
        [id]: participant
      })
    }),
    'reseted': (_, { payload: { participants }}) => ({participants: participants}),
    [reset]: ({}) => ({
      game_page: "waiting",
      game_round: 1, game_round_temp: 1,
      game_point: 10, game_point_temp: 10,
      game_rate: 3, game_rate_temp: 3,
      pairs: {},
      trust_results: {},
    }),
    'matched': (_, { payload: { participants, pairs } }) => ({
      participants, pairs
    }),
    'finish investing': ({ pairs }, { payload }) => ({
      pairs: Object.assign({}, pairs, {
        [payload]: Object.assign({}, pairs[payload], {
          pair_state: "responding"
        })
      })
    }),
    'finish responding': ({ game_round, participants, pairs },
      { payload: {id, target_id, pair_id, id_point, target_id_point, trust_results}}) => ({
      trust_results: trust_results,
      participants: Object.assign({}, participants, {
        [id]: Object.assign({}, participants[id], { // id = Responder
          role: pairs[pair_id].pair_round < game_round? participants[target_id].role : participants[id].role,
          point: id_point,
        }),
        [target_id]: Object.assign({}, participants[target_id], { // target_id = Investor
          role: pairs[pair_id].pair_round < game_round? participants[id].role : participants[target_id].role,
          point: target_id_point,
        })
      }),
      pairs: Object.assign({}, pairs, {
        [pair_id]: Object.assign({}, pairs[pair_id], {
          pair_state: pairs[pair_id].pair_round < game_round? "investing" : "finished",
          pair_round: pairs[pair_id].pair_round < game_round?
            pairs[pair_id].pair_round + 1 : pairs[pair_id].pair_round
        })
      })
    }),
    [changeChartRound]: (_, { payload }) => ({ chart_round: payload, chart_button: true}),
    [fallChartButton]: () => ({ chart_button: false}),
  }, initialState),
])

export default reducer
