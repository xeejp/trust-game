import React from 'react'
import Avatar from 'material-ui/Avatar'
import { blue400 } from 'material-ui/styles/colors';

import Point from '../components/Point.js'

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
        </Avatar>ポイント
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
        </Avatar>×{rate}倍＝
        <Avatar
          backgroundColor={blue400}
          size={50}
          style={{margin: 5}}
        >
          <Point>{point * rate}</Point>
        </Avatar>ポイント
      </span>
    )
  }
}

export default PassPoint
