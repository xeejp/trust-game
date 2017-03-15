import concatenateReducers from 'redux-concatenate-reducers'
import { handleAction, handleActions } from 'redux-actions'

import {
  game_modes,
  pages,
  roles,
  states,
} from '../util/index.js'

import {
  changeChartRound,
  fallChartButton,
  syncInvTemp,
  finishInvesting,
  syncResTemp,
  finishResponding,
  fallSnackBarFlags,
  fallSnackBarFlags2,
} from './actions.js'

const initialState = {
  question: '',
  point: 0,
  role: "visitor",
  pair_id: null,
  chart_round: 1,
  chart_button: false,
  pair_round: 1,
  pair_state: "investing",
  inv_temp: 0,
  res_temp: 0,
  inv_results: {},
  trust_results: {},
  participants_length: 0,
  invested_flag: false,
  responded_flag: false,
  change_role_flag: false,
}

const reducer = concatenateReducers([
  handleActions({
    'update contents': (_, { payload }) => payload,
    'sync game progress': (_, { payload }) => ({ game_progress: payload }),
    'sync participants length': (_, { payload }) => ({ participants_length: payload }),

    'change page': (_, { payload }) => ({ game_page: payload }),
    'change game_round': (_, { payload }) => ({ game_round: payload }),
    'change game_point': (_, { payload }) => ({ game_point: payload }),
    'change game_rate': (_, { payload }) => ({ game_rate: payload }),

    'reseted': () => ({
      game_page: "waiting", game_round: 1, game_point: 10, game_rate: 3, role: "visitor", point: 0, pair_id: null,
    }),
    'show results': (_ , { payload }) => ({
      trust_results: payload,
    }),
    'join': ({ participants }, { payload: { id, participant } }) => ({
      participants: Object.assign({}, participants, { [id]: participant })
    }),
    'matched': (_, { payload: {
      inv_temp, res_temp, members, pair_round, pair_id, point, results, role, pair_state
    } }) => ({
      inv_temp, res_temp, members, pair_round, pair_id, point, results, role, pair_state
    }),

    [syncInvTemp]: (_, { payload }) => ({ inv_temp: payload }),
    'sync inv_temp': (_, { payload }) => ({ inv_temp: payload }),
    [finishInvesting]: (_, { payload }) => ({ pair_state: "responding", inv_final: payload, inv_temp: 0, invested_flag: true, }),
    'finish investing': (_, { payload }) => ({ pair_state: "responding", inv_final: payload, inv_temp: 0, invested_flag: true, }),
    [syncResTemp]: (_, { payload }) => ({ res_temp: payload }),
    'sync res_temp': (_, { payload }) => ({ res_temp: payload }),
    [finishResponding]: ({ point, game_rate, game_round, pair_round, inv_final }, { payload }) => ({
      pair_state: pair_round < game_round? "investing" : "finished",
      pair_round: pair_round < game_round? pair_round+1 : pair_round,
      role: pair_round < game_round? "investor" : "responder",
      point: point + (inv_final*game_rate) - payload,
      res_temp: 0,
      res_final: payload,
      responded_flag: true,
    }),
    'finish responding': ({ point, game_rate, game_point, game_round, pair_round, inv_final }, { payload }) => ({
      pair_state: pair_round < game_round? "investing" : "finished",
      pair_round: pair_round < game_round? pair_round+1 : pair_round,
      role: pair_round < game_round? "responder" : "investor",
      point: point + game_point - inv_final + payload,
      res_temp: 0,
      res_final: payload,
      responded_flag: true,
    }),

    [fallSnackBarFlags]: ({ pair_state }) => ({ invested_flag: false, responded_flag: false, change_role_flag: pair_state == "investing" }),
    [fallSnackBarFlags2]: ({}) => ({ change_role_flag: false }),
    [changeChartRound]: (_, { payload }) => ({ chart_round: payload, chart_button: true }),
    [fallChartButton]: () => ({ chart_button: false}),
  }, initialState),
  handleAction('update contents', () => ({ loading: false }), { loading: true })
])

export default reducer
