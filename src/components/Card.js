import React from 'react'
import CardImage from './CardImage'
import WatchedIcon from '../components/WatchedIcon'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Link from '@material-ui/core/Link'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

const watchIconStyle = {
  position: 'absolute',
  width: 100,
  'z-index': '10000'
}

const imageStyle = {
  // position: 'absolute'
}

export default function SimpleCard(props) {
  const episodeId = props.episodeId
  const episodeTitle = props.episodeTitle
  const watchStatus = props.watchStatus || false // true: 'watched' or false: 'unwatched'
  const imdbLink = props.imdbLink

  const useStyles = makeStyles({
    card: {
      // minHeight: 200,
      opacity: watchStatus === true ? 0.4 : 1
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

  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <Link href={imdbLink}
            target='_blank'
            rel='noopener'
            color='inherit'
            underline='none'>
        <CardContent>
          { watchStatus === true ?
              <div style={watchIconStyle}>
                <WatchedIcon></WatchedIcon>
              </div>
            : '' }
          <CardImage style={imageStyle} episodeId={episodeId} className={classes.image}></CardImage>
          <Typography className={classes.title} color='textSecondary' gutterBottom>
            {episodeId.toUpperCase()}
          </Typography>
          <Typography variant='h5' component='h2' className={classes.pos}>
            {episodeTitle}
          </Typography>
          {/* <Typography variant='body2' component='p' color='textSecondary'>
            Lorem ipsum
          </Typography> */}
        </CardContent>
      </Link>
    </Card>
  )
}