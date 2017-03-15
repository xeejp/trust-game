import React, { Component } from 'react'
import { connect } from 'react-redux'

import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ImageEdit from 'material-ui/svg-icons/image/edit'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'

import Description from '../participant/Description'
import { changeQuestion } from './actions.js'

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
  }

  render(){
    const { style, disabled } = this.props
    const { text } = this.state
    const actions = [
      <RaisedButton
        label="適用"
        primary={true}
        onTouchTap={this.handleConfirm}
      />,
      <RaisedButton
        label="終了"
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
          title="問題文編集"
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
          <h3>プレビュー</h3>
          <Description />
        </Dialog>
      </span>
    )
  }
}

export default connect(mapStateToProps)(EditQuestion)
