import React from 'react'
import CardImage from './CardImage'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Link from '@material-ui/core/Link'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  card: {
    // minWidth: 275,
    opacity: 1
  },
  title: {
    fontSize: 14,
  },
  pos: {
    fontSize: 20,
    marginBottom: 12,
  },
  image: {
    marginBottom: 12
  }
})

export default function SimpleCard(props) {
  const episodeId = props.episodeId
  const episodeTitle = props.episodeTitle
  const watchStatus = null // 'watched' or 'unwatched'
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <Link href='http://google.com/'
            target='_blank'
            rel='noopener'
            color='inherit'
            underline='none'>
        <CardContent>
          <CardImage episodeId={episodeId} className={classes.image}></CardImage>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            {episodeId}
          </Typography>
          <Typography variant="h5" component="h2" className={classes.pos}>
            Pilot
          </Typography>
          <Typography variant="body2" component="p" color="textSecondary">
            Lorem ipsum
          </Typography>
        </CardContent>
      </Link>
    </Card>
  )
}