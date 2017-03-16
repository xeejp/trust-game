import React from 'react'

import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton';

const Notice = ({ open, message, onRequestClose }) => (
  <Dialog
    actions={[(
      <RaisedButton
        label='閉じる'
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
