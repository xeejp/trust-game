import React from 'react'

import List from 'material-ui/List/List'
import ListItem from 'material-ui/List/ListItem'

import HoldPoint from './HoldPoint.js'
import PassPoint from './PassPoint.js'

import { ReadJSON } from '../util/ReadJSON'

const PairResult = ({ id, investor, inv, res, point, rate }) => {
  if (id == investor) {
    return (
      <List>
        <ListItem>
          <PassPoint
            point={inv}
            text={ReadJSON().static_text["passed_point"]}
            rate={rate}
          />
        </ListItem>
        <ListItem>
          <HoldPoint
            point={point - inv}
            text={ReadJSON().static_text["remained_point"]}
          />
        </ListItem>
        <ListItem>
          <PassPoint
            point={res}
            text={ReadJSON().static_text["return_point"]}
          />
        </ListItem>
      </List>
    )
  } else {
    return (
      <List>
        <ListItem>
          <PassPoint
            text={ReadJSON().static_text["receive_point"]}
            point={inv}
            rate={rate}
          />
        </ListItem>
        <ListItem>
          <HoldPoint
            point={inv * rate - res}
            text={ReadJSON().static_text["remain_point"]}
          />
        </ListItem>
        <ListItem>
          <PassPoint
            point={res}
            text={ReadJSON().static_text["pass_point"]}
          />
        </ListItem>
      </List>
    )
  }
}

export default PairResult
