import React, { Component } from 'react'
import { connect } from 'react-redux'

import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ImageEdit from 'material-ui/svg-icons/image/edit'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'

import { changeQuestion } from './actions.js'

import { ReadJSON } from '../util/ReadJSON'

const mapStateToProps = ({ question }) => ({ question })

class EditQuestion extends Component {
  constructor(props){
    super(props)
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleConfirm = this.handleConfirm.bind(this)
    this.state = {
      open: false,
      text: ''
    }
  }

  handleOpen() {
    const { question } = this.props
    this.setState({
      open: true,
      text: question
    })
  }

  handleClose() {
    this.setState({open: false})
  }

  handleChange(event) {
    this.setState({text: event.target.value})
  }

  handleConfirm() {
    const { dispatch } = this.props
    const { text } = this.state
    dispatch(changeQuestion(text))
    this.handleClose()
  }

  render(){
    const { style, disabled } = this.props
    const { text } = this.state
    const actions = [
      <RaisedButton
        label={ReadJSON().static_text["apply"]}
        primary={true}
        onTouchTap={this.handleConfirm}
        style={{marginRight: "10px",}}
      />,
      <RaisedButton
        label={ReadJSON().static_text["end"]}
        onTouchTap={this.handleClose}
      />,
    ]
    return (
      <span>
        <FloatingActionButton onClick={this.handleOpen}
          style={style} disabled={disabled}>
          <ImageEdit />
        </FloatingActionButton>
        <Dialog
          title={ReadJSON().static_text["edit"]}
          actions={actions}
          modal={true}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          <TextField
            id="question"
            value={text}
            onChange={this.handleChange}
            multiLine={true}
            fullWidth={true}
          />
        </Dialog>
      </span>
    )
  }
}

export default connect(mapStateToProps)(EditQuestion)
