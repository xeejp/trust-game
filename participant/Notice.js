import React from 'react'

import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton';

import { ReadJSON } from '../util/ReadJSON'

const Notice = ({ open, message, onRequestClose }) => (
  <Dialog
    actions={[(
      <RaisedButton
        label={ReadJSON().static_text["close"]}
        primary={true}
        onTouchTap={onRequestClose}
      />
    )]}
    modal={true}
    open={open}
    onRequestClose={onRequestClose}
  >
    {message}
  </Dialog>
)

export default Notice
