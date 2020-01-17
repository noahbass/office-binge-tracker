import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Card from '../components/Card'
import LoadingPlaceholder from '../components/LoadingPlaceholder'


const IndexPage = () => {
  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }))
  const classes = useStyles()

  // Client-side Runtime Data Fetching
  const [loading, setLoading] = useState(true)
  const [episodeData, setEpisodeData] = useState(0)

  useEffect(() => {
    // get data from GitHub api
    fetch(`http://localhost:34567/.netlify/functions/get-episodes`)
      .then(response => response.json()) // parse JSON from request
      .then(result => {
        const data = result.data

        const getId = (episodeId) => {
          // Given the episode id, return the incremental id
          return Number(episodeId.substring(1, 2)) * 100 + Number(episodeId.substring(4))
        }

        // calculate incrementing epsode ids to sort by
        const incrementalIdData = data.map(entry => {
          return {
            id: Number(getId(entry.episodeId)),
            ...entry
          }
        })

        // sort by incremental episode ids
        function compare(a, b) {
          if (a.id < b.id) return -1
          if (a.id > b.id) return 1
          return 0
        }

        incrementalIdData.sort(compare);

        setEpisodeData(incrementalIdData)
        setLoading(false)
      })
  }, [])

  return (
    <Layout>
      <SEO title='Home' />

      <p>Loading: {String(loading)}</p>

      {/* <LoadingPlaceholder></LoadingPlaceholder> */}

      <Grid container spacing={4}>
        {/* <Grid item xs={12}>
          <Paper className={classes.paper}>xs=12</Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>xs=12 sm=6</Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>xs=12 sm=6</Paper>
        </Grid> */}
        {loading ? '' : episodeData.map(episode => (
          <Grid item xs={6} sm={4} md={2} lg={2} xl={2}>
            <Card
                episodeId={episode.episodeId}
                episodeTitle={episode.episodeTitle}
                imdbLink={episode.episodeImdbLink}
                watchStatus={episode.watched}
                manage={true}
                >
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div> */}
      <Link to='/page-2/'>Go to page 2</Link>
    </Layout>
  )
}

export default IndexPage
