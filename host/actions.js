import { createAction } from 'redux-actions'

export const fetchContents = createAction('FETCH_CONTENTS')

export const showResults = createAction('SHOW_RESULTS')

export const match = createAction('MATCH')
export const reset = createAction('RESET')

export const changeChartRound = createAction('CHANGE_CHART_ROUND', chart_round => chart_round)
export const fallChartButton = createAction('FALL_CHART_BUTTON')

export const changePage = createAction('CHANGE_PAGE', page => page)
export const changeGameRound = createAction('CHANGE_GAME_ROUND', game_round => game_round)

export const intoLoading = createAction('INTO_LOADING')
export const exitLoading = createAction('EXIT_LOADING')
