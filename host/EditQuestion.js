import React, { Component } from 'react'
import { connect } from 'react-redux'

import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ImageEdit from 'material-ui/svg-icons/image/edit'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'

import { changeQuestion } from './actions.js'

import { ReadJSON } from '../util/ReadJSON'
import { fetchContents } from '../participant/actions';

const mapStateToProps = ({ dynamic_text }) => ({ dynamic_text })

class EditQuestion extends Component {
  constructor(props){
    super(props)
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleConfirm = this.handleConfirm.bind(this)

    const { dynamic_text } = this.props
    var default_text = dynamic_text
    if(!dynamic_text) {
      default_text = ReadJSON().dynamic_text
      const { dispatch } = this.props
      dispatch(changeQuestion(default_text))
    }
    this.state = {
      open: false,
      dynamic_text: default_text,
    }
  }

  handleOpen() {
    const { dispatch } = this.props
    dispatch(fetchContents())
    this.setState({
      open: true,
      text: this.props.dynamic_text
    })
  }

  handleClose() {
    this.setState({open: false})
  }

  handleChangeDynamicText(value, event){
    var dynamic_text = Object.assign({}, this.state.dynamic_text)
    var temp = dynamic_text
    for(var i = 0; i < value.length - 1; i++){
      temp = temp[value[i]]
    }
    temp[value[value.length - 1]] = event.target.value
    this.setState({ dynamic_text: dynamic_text })
  }

  handleConfirm() {
    const { dispatch } = this.props
    dispatch(changeQuestion(this.state.dynamic_text))
    this.handleClose()
  }

  render(){
    const { style, disabled } = this.props
    const { dynamic_text } = this.state
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
            value={dynamic_text["description"][1]}
            onChange={this.handleChangeDynamicText.bind(this, ["description", 1])}
            multiLine={true}
            fullWidth={true}
          />
          <TextField
            value={dynamic_text["description"][2]}
            onChange={this.handleChangeDynamicText.bind(this, ["description", 2])}
          />
          <TextField
            value={dynamic_text["description"][3]}
            onChange={this.handleChangeDynamicText.bind(this, ["description", 3])}
            fullWidth={true}
          />
          <TextField
            value={dynamic_text["description"][4]}
            onChange={this.handleChangeDynamicText.bind(this, ["description", 4])}
          />
          <TextField
            value={dynamic_text["description"][5]}
            onChange={this.handleChangeDynamicText.bind(this, ["description", 5])}
            fullWidth={true}
          />
          <TextField
            value={dynamic_text["description"][6]}
            onChange={this.handleChangeDynamicText.bind(this, ["description", 6])}
            multiLine={true}
            fullWidth={true}
          />
        </Dialog>
      </span>
    )
  }
}

export default connect(mapStateToProps)(EditQuestion)
