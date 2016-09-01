import React, { Component } from 'react'
import { connect } from 'react-redux'

import Chip from 'material-ui/chip'
import IconButton from 'material-ui/IconButton';
import Increment from 'material-ui/svg-icons/content/add'
import Decrement from 'material-ui/svg-icons/content/remove'
import { grey300 } from 'material-ui/styles/colors';

const styles = {
  block: {
    clear: "both",
    margin: "auto",
  },
  icon: {
    float: "left",
    marginRight: 24,
  },
  left: {
    float: "left",
    marginRight: 24,
  },
  right: {
    float: "left",
    marginRight: 24,
  },
  value: {
    float: "left",
    marginRight: 24,
  },
  label: {
  }
}

const Counter = ({ title, value, min, max,
  minTip, decTip, incTip, maxTip, decHandle, incHandle}) => (
  <div style={styles.block}>
    <p>{title}</p>
    { value != min?
      <IconButton iconStyle={styles.icon} style={styles.left}
        tooltip={decTip} onClick={decHandle}>
        <Decrement/>
      </IconButton>
    :
      <IconButton iconStyle={styles.icon} style={styles.left}
        tooltip={minTip}>
        <Decrement color={grey300}/>
      </IconButton>
    }
    <Chip style={styles.value} labelStyle={styles.label}>{value}</Chip>
    { value != max?
      <IconButton iconStyle={styles.icon} style={styles.right}
        tooltip={incTip} onClick={incHandle}>
        <Increment/>
      </IconButton>
    :
      <IconButton iconStyle={styles.icon} style={styles.right}
        tooltip={maxTip}>
        <Increment color={grey300}/>
      </IconButton>
    }
  </div>
)

export default connect()(Counter)
