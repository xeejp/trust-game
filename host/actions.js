import { createAction } from 'redux-actions'

export const fetchContents = createAction('FETCH_CONTENTS')

export const match = createAction('MATCH')
export const reset = createAction('RESET')

export const changeChartRound = createAction('CHANGE_CHART_ROUND', chart_round => chart_round)
export const fallChartButton = createAction('FALL_CHART_BUTTON')

export const changePage = createAction('CHANGE_PAGE', page => page)
export const changeGameRound = createAction('CHANGE_GAME_ROUND', game_round => game_round)
export const changeGamePoint = createAction('CHANGE_GAME_POINT', game_point => game_point)
export const changeGameRate = createAction('CHANGE_GAME_RATE', game_rate => game_rate)

export const visit = createAction('VISIT')

export const changeQuestion = createAction('CHANGE_QUESTION', text => text)

export const intoLoading = createAction('INTO_LOADING')
export const exitLoading = createAction('EXIT_LOADING')

export const openParticipantPage = createAction('open participant page')
