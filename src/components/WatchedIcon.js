import React from 'react'
import { CheckCircleOutline } from '@material-ui/icons'

const WatchedIcon = (props) => {
  const color = props.color || '#fff'

  return (
    <CheckCircleOutline></CheckCircleOutline>
  )
}

export default WatchedIcon
