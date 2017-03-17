import React from 'react'

const Point = ({ children }) => {
  const point = children.toFixed(1).replace(/\.0$/, '')
  return <span>{point}</span>
}

export default Point
