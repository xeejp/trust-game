export function getPageName(page) {
  switch(page) {
    case 'waiting'    : return "待機"
    case 'description': return "説明"
    case 'experiment' : return "実験"
    case 'result'     : return "結果"
  }
}

export function getRoleName(role) {
  switch(role) {
    case "visitor"  : return "見学者"
    case "dictator" : return "独裁者"
    case "responder": return "受け手"
  }
}

export function getStateName(state) {
  switch(state) {
    case "allocating": return "配分中"
    case "judging"   : return "判定中"
    case "finished"  : return "終了"
  }
}

export const game_modes = [
  "dictator"
]
export const pages = [
  "waiting",
  "description",
  "experiment",
  "result"
]

export const roles = [
  "visitor",
  "dictator",
  "responder"
]

export const states = [
  "allocating",
  "judging",
  "finished"
]
