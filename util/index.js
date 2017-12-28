import { ReadJSON } from './ReadJSON'

export const game_pages = [
  "waiting",
  "description",
  "experiment",
  "result"
]

export function getPageName(page) {
  switch(game_pages.indexOf(page)) {
    case 0: return ReadJSON().static_text["pages"][0]
    case 1: return ReadJSON().static_text["pages"][1]
    case 2: return ReadJSON().static_text["pages"][2]
    case 3: return ReadJSON().static_text["pages"][3]
  }
}

export function getRoleName(role) {
  switch(role) {
    case "visitor"  : return ReadJSON().static_text["roles"][0]
    case "investor" : return ReadJSON().static_text["roles"][1]
    case "responder": return ReadJSON().static_text["roles"][2]
  }
}

export function getStateName(state) {
  switch(state) {
    case "investing" : return ReadJSON().static_text["status"][0]
    case "responding": return ReadJSON().static_text["status"][1]
    case "finished"  : return ReadJSON().static_text["status"][2]
  }
}
