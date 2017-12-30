import React from 'react'
import { connect } from 'react-redux'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import FileFileDownload from 'material-ui/svg-icons/file/file-download'

import { ReadJSON, InsertVariable } from '../util/ReadJSON'

const mapStateToProps = ({ participants, trust_results, game_point, game_rate, game_round }) => ({
  participants, trust_results, game_point, game_rate, game_round 
})

const DownloadButton = ({ participants, trust_results, game_point, game_rate, game_round, style ,disabled}) => (
  <FloatingActionButton
    style={style}
    disabled={disabled}
    onClick={() => {
      var fileName = "trust_game.csv"

      var content = [
      [ReadJSON().static_text["title"]],
      [ReadJSON().static_text["file"][0], new Date()],
      [ReadJSON().static_text["file"][1], InsertVariable(ReadJSON().static_text["file"][2], { point: game_point })],
      [ReadJSON().static_text["file"][3], InsertVariable(ReadJSON().static_text["file"][4], { rate: game_rate })],
      [ReadJSON().static_text["file"][5], InsertVariable(ReadJSON().static_text["file"][6], { turn: game_round })],
      [ReadJSON().static_text["file"][7], InsertVariable(ReadJSON().static_text["file"][8], { num: Object.keys(participants).length })],
      [],
      [ReadJSON().static_text["file"][9], ReadJSON().static_text["file"][10], ReadJSON().static_text["file"][11], ReadJSON().static_text["file"][12]]].concat(
      Object.keys(participants).map(id => [id,
                                           participants[id].pair_id,
                                           participants[id].point,
                                           participants[id].role])).concat([
      [ReadJSON().static_text["file"][5], ReadJSON().static_text["file"][10], ReadJSON().static_text["file"][13], ReadJSON().static_text["file"][14], ReadJSON().static_text["file"][15]]]).concat(
      Object.keys(trust_results).map(id2 => 
        Object.keys(trust_results[id2]).map(id3 => [id2,
                                                    id3,
                                                    trust_results[id2][id3].hold + trust_results[id2][id3].return,
                                                    trust_results[id2][id3].hold,
                                                    trust_results[id2][id3].return])).reduce((a, b) => a.concat(b), [])).map(ls => ls.join(',')).join('\n')
      var bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
      var blob = new Blob([bom,content]);
      var url = window.URL || window.webkitURL;
      var blobURL = url.createObjectURL(blob);

      if(window.navigator.msSaveBlob){
        window.navigator.msSaveBlob(blob, fileName)
      }
      else{
        var a = document.createElement('a');
         a.download = fileName;
         a.href = blobURL;
         a.click();  
       }
      }
    }
    ><FileFileDownload /></FloatingActionButton>
)

export default connect(mapStateToProps)(DownloadButton) 
