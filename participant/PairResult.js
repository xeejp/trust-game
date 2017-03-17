import React from 'react'

import List from 'material-ui/List/List'
import ListItem from 'material-ui/List/ListItem'

import HoldPoint from './HoldPoint.js'
import PassPoint from './PassPoint.js'

const PairResult = ({ id, investor, inv, res, point, rate }) => {
  if (id == investor) {
    return (
      <List>
        <ListItem>
          <PassPoint
            point={inv}
            text='相手が受け取ったポイント'
            rate={rate}
          />
        </ListItem>
        <ListItem>
          <HoldPoint
            point={point - inv}
            text='手もとに残ったポイント'
          />
        </ListItem>
        <ListItem>
          <PassPoint
            point={res}
            text='帰ってきたポイント'
          />
        </ListItem>
      </List>
    )
  } else {
    return (
      <List>
        <ListItem>
          <PassPoint
            text='相手から受け取ったポイント'
            point={inv}
            rate={rate}
          />
        </ListItem>
        <ListItem>
          <HoldPoint
            point={inv * rate - res}
            text='手もとに残るポイント'
          />
        </ListItem>
        <ListItem>
          <PassPoint
            point={res}
            text='相手に渡すポイント'
          />
        </ListItem>
      </List>
    )
  }
}

export default PairResult
