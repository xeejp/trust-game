import React from 'react'
import Avatar from 'material-ui/Avatar'
import { pink400 } from 'material-ui/styles/colors';

import Point from '../components/Point.js'

const HoldPoint = ({ point, text }) => {
  return (
    <span>
      <p>{text}</p>
      <Avatar
        backgroundColor={pink400}
        size={50}
        style={{margin: 5}}
      >
        <Point>{point}</Point>
      </Avatar>ポイント
    </span>
  )
}

export default HoldPoint
