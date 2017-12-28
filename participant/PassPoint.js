import React from 'react'
import Avatar from 'material-ui/Avatar'
import { blue400 } from 'material-ui/styles/colors';

import Point from '../components/Point.js'

import { ReadJSON, InsertVariable } from '../util/ReadJSON'

const PassPoint = ({point, text, rate}) => {
  if (rate == null) {
    return (
      <span>
        <p>{text}</p>
        <Avatar
          backgroundColor={blue400}
          size={50}
          style={{margin: 5}}
        >
          <Point>{point}</Point>
        </Avatar>{ReadJSON().static_text["point"]}
      </span>
    )
  } else {
    return (
      <span>
        <p>{text}</p>
        <Avatar
          backgroundColor={blue400}
          size={50}
          style={{margin: 5}}
        >
          <Point>{point}</Point>
        </Avatar>×{InsertVariable(ReadJSON().static_text["rate_times"], { rate: rate })}＝
        <Avatar
          backgroundColor={blue400}
          size={50}
          style={{margin: 5}}
        >
          <Point>{point * rate}</Point>
        </Avatar>{ReadJSON().static_text["point"]}
      </span>
    )
  }
}

export default PassPoint
