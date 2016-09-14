export const game_pages = [
  "waiting",
  "description",
  "experiment",
  "result"
]

export function getPageName(page) {
  switch(game_pages.indexOf(page)) {
    case 0: return "待機"
    case 1: return "説明"
    case 2: return "実験"
    case 3: return "結果"
  }
}

export function getRoleName(role) {
  switch(role) {
    case "visitor"  : return "見学者"
    case "investor" : return "投資者"
    case "responder": return "応答者"
  }
}

export function getStateName(state) {
  switch(state) {
    case "investing" : return "投資中"
    case "responding": return "応答中"
    case "finished"  : return "終了"
  }
}
