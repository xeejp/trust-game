import { createAction } from 'redux-actions'

export const fetchContents = createAction('FETCH_CONTENTS')

export const changeNowRound = createAction('CHANGE_NOW_ROUND')

export const changeChartRound = createAction('CHANGE_CHART_ROUND', chart_round => chart_round)
export const fallChartButton = createAction('FALL_CHART_BUTTON')

export const syncInvTemp = createAction('SYNC_INV_TEMP')
export const finishInvesting = createAction('FINISH_INVESTING')
export const syncResTemp = createAction('SYNC_RES_TEMP')
export const finishResponding = createAction('FINISH_RESPONDING')

export const noticeRoleChanged = createAction('NOTICE_ROLE_CHANGED')
export const fallSnackBarFlags = createAction('FALL_SNACK_BAR_FLAGS')
export const fallSnackBarFlags2 = createAction('FALL_SNACK_BAR_FLAGS2')
