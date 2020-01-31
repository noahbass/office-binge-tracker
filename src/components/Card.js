import React from 'react'
import CardImage from './CardImage'
import WatchedIcon from '../components/WatchedIcon'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Link from '@material-ui/core/Link'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Checkbox from '@material-ui/core/Checkbox'
import Box from '@material-ui/core/Box'
import netlifyIdentity from 'netlify-identity-widget'

const watchIconStyle = {
  position: 'absolute',
  width: 100,
  'z-index': '10000'
}

export default function SimpleCard(props) {
  const episodeId = props.episodeId
  const episodeTitle = props.episodeTitle
  const imdbLink = props.imdbLink
  const manage = props.manage

  const watchStatus = props.watchStatus || false // true: 'watched' or false: 'unwatched'
  const [watchChecked, setWatchChecked] = React.useState(watchStatus) // hook for watch

  const useStyles = makeStyles({
    card: {
      // minHeight: 200,
      opacity: watchChecked === true ? 0.5 : 1
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

  // Handle checkbox clicked event
  const handleCheckboxChange = async event => {
    const target = event.target
    const isChecked = target.checked

    if (isChecked) {
      setWatchChecked(true) // Checkbox is now true
      await updateWatchStatus(episodeId, true)
    } else {
      setWatchChecked(false) // Checkbox is now false
      await updateWatchStatus(episodeId, false)
    }
  }

  // https://www.netlify.com/blog/2018/03/29/jamstack-architecture-on-netlify-how-identity-and-functions-work-together/
  const generateHeaders = () => {
    const headers = { 'Content-Type': 'application/json' }

    if (netlifyIdentity.currentUser()) {
      return netlifyIdentity.currentUser().jwt().then((token) => {
        return { ...headers, Authorization: `Bearer ${token}` }
      })
    }

    return Promise.resolve(headers)
  }

  // Call API to update watch status
  const updateWatchStatus = async (episodeId, newWatchStatus) => {
    const requestBody = {
      episodeId: episodeId,
      watched: newWatchStatus
    }

    const headers = await generateHeaders()
    console.log(headers)

    await fetch(
      `/.netlify/functions/update-episode`,
      {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestBody)
      }
    )
  }

  return (
    <Card className={classes.card}>
      <Link href={imdbLink}
            target='_blank'
            rel='noopener'
            color='inherit'
            underline='none'>
        <CardContent>
          { watchChecked === true ?
              <div style={watchIconStyle}>
                <Box m={0.5}>
                  <WatchedIcon></WatchedIcon>
                </Box>
              </div>
            : '' }
          <CardImage episodeId={episodeId} className={classes.image}></CardImage>
          <Typography className={classes.title} color='textSecondary' gutterBottom>
            {episodeId.toUpperCase()}
          </Typography>
          <Typography variant='h5' component='h2' className={classes.pos}>
            {episodeTitle}
            { manage === true ? 
                <span>
                  <Checkbox checked={watchChecked} onChange={handleCheckboxChange}></Checkbox>
                </span> : '' }
          </Typography>
        </CardContent>
      </Link>
    </Card>
  )
}