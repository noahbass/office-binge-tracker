import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  card: {
    // minHeight: 200,
    opacity: 1
  },
  title: {
    fontSize: 14,
  },
  pos: {
    fontSize: 20,
    // marginBottom: 12
  },
  image: {
    // marginBottom: 20
  }
})

export default function StatsDisplay(props) {
  const classes = useStyles()

  return (
    <div className={classes.card}>
      <Typography className={classes.title} color='textSecondary' gutterBottom>
      {episodeId.toUpperCase()}
      </Typography>
      <Typography variant='h5' component='h2' className={classes.pos}>
      {episodeTitle}
      </Typography>
      {/* <Typography variant='body2' component='p' color='textSecondary'>
      Lorem ipsum
      </Typography> */}
    </div>
  )
}
