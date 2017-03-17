import React from 'react'
import Avatar from 'material-ui/Avatar'
import { blue400 } from 'material-ui/styles/colors';

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
          {point}
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
          {point}
        </Avatar>×{rate}倍＝
        <Avatar
          backgroundColor={blue400}
          size={50}
          style={{margin: 5}}
        >
          {point*rate}
        </Avatar>ポイント
      </span>
    )
  }
}

export default PassPoint
