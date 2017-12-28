import React, { Component } from 'react'
import { connect } from 'react-redux'

import { grey300 } from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';

import { ReadJSON } from '../util/ReadJSON'

const styles = {
  block: {
    clear: "both",
    margin: "auto",
  }
}

const Counter = ({ title, value, min, max, changeHandle}) => (
  <div style={styles.block}>
    <TextField
      floatingLabelText={title}
      defaultValue={value}
      min={min}
      max={max}
      hintText={ReadJSON().static_text["counter"]}
      onBlur={changeHandle} />
  </div>
)

export default connect()(Counter)
