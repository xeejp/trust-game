import React, { Component } from 'react'

import { blue400, pink400 } from 'material-ui/styles/colors'

const Panel = ({ selected, onClick, first = false, last = false }) => {
  const color = selected ? blue400 : pink400
  const clear = first ? 'left' : null
  const style = {
    float: 'left', clear,
    background: color,
    width: '10%',
    height: '100%',
    borderLeft: first ? '3px solid black' : null,
    borderRight: last ? '3px solid black' : '3px dotted black',
    borderTop: '3px solid black',
    borderBottom: '3px solid black'
  }
  return (
    <div onClick={onClick} style={style} />
  )
}

class Slider extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      animation: false,
      animationProgress: -1
    }
  }

  getValueForSelection(number) {
    const { min, max, divisor } = this.props
    return (max - min) * (number + 1) / divisor
  }

  getSelectionForValue(value) {
    const { min, max, divisor } = this.props
    // value = (max - min) * number / divisor
    return Math.round(value * divisor / (max - min)) - 1
  }

  handleClick(number) {
    const { onChange, value } = this.props
    const selection = this.getSelectionForValue(value)
    if (selection === number) {
      onChange(null, 0)
    } else {
      onChange(null, this.getValueForSelection(number))
    }
  }

  componentDidMount() {
    const { divisor, onChange } = this.props
    const delta = 50
    this.setState({animation: true, animationProgress: -1})
    let delay = 0
    for (let i = 0; i < divisor; i ++) {
      setTimeout(() => {
        this.setState({animationProgress: i})
      }, delay)
      delay += delta
    }
    for (let i = 0; i < divisor; i ++) {
      const selection = divisor - 1 - i - 1
      setTimeout(() => {
        this.setState({animationProgress: selection})
      }, delay)
      delay += delta
    }
    setTimeout(() => {
      this.setState({animation: false})
    }, delay)
  }

  render() {
    const { value, divisor } = this.props
    const { animation, animationProgress } = this.state
    const selection = animation
      ? animationProgress
      : this.getSelectionForValue(value)
    const panels = new Array(divisor)
    for (let i = 0; i < divisor; i ++) {
      panels[i] = (
        <Panel
          first={i == 0}
          last={i == divisor - 1}
          key={i}
          selected={selection >= i}
          onClick={() => this.handleClick(i)}
        />
      )
    }
    return (
      <div style={{clear: 'left', width: '100%', height: '75px'}}>
        {panels}
        <div style={{clear: 'left'}} />
      </div>
    )
  }
}

export default Slider
