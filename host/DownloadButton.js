import React from 'react'
import { connect } from 'react-redux'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import FileFileDownload from 'material-ui/svg-icons/file/file-download'

const mapStateToProps = ({ participants, trust_results, game_point, game_rate, game_round }) => ({
  participants, trust_results, game_point, game_rate, game_round 
})

const DownloadButton = ({ participants, trust_results, game_point, game_rate, game_round, style ,disabled}) => (
  <FloatingActionButton
    style={style}
    disabled={disabled}
    onClick={() => {
      var fileName = "trust_game" + new Date() + ".csv"

      var content 
      = "信頼ゲーム\n" 
      + "実験日," + new Date() + "\n"
      + "初期ポイント数," + game_point + "ポイント\n"
      + "レート," + game_rate + "倍\n"
      + "ターン数," + game_round + "ターン\n"
      + "登録者数," + Object.keys(participants).length + "\n\n"
      + "ID,ペア番号,最終ポイント,役割\n"
      + Object.keys(participants).map(id => [id,
                                             participants[id].pair_id,
                                             participants[id].point,
                                             participants[id].role].join(',')).join("\n")
      + "\nターン数,ペア番号,応答者が受け取ったポイント,応答者が手もとに残したポイント,応答者が返却したポイント\n"
      + Object.keys(trust_results).map(id2 => [
                                               Object.keys(trust_results[id2]).map(id3 => [id2,
                                                                                           id3,
                                                                                           trust_results[id2][id3].hold + trust_results[id2][id3].return,
                                                                                           trust_results[id2][id3].hold,
                                                                                           trust_results[id2][id3].return].join(',')).join("\n")].join(',')).join("\n");
      
      var blob = new Blob([content]);
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