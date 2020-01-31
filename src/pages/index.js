import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { isLoggedIn } from '../services/auth'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Card from '../components/Card'
import LoadingPlaceholder from '../components/LoadingPlaceholder'
import { Facebook, Code, ContentLoader } from 'react-content-loader'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { Face } from '@material-ui/icons'


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
  const [numberEpisodesWatched, setNumberEpisodesWatched] = useState(0)

  useEffect(() => {
    // get data from GitHub api
    fetch(`/.netlify/functions/get-episodes`)
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

        const numberEpisodesWatched = incrementalIdData.filter(entry => entry.watched && entry.watched === true).length

        setEpisodeData(incrementalIdData)
        setNumberEpisodesWatched(numberEpisodesWatched)
        setLoading(false)
      })
  }, [])

  const graduationCounter = () => {
    const oneDay = 24 * 60 * 60 * 1000
    const now = new Date()
    const targetDate = new Date(2020, 4, 1) // May 1, 2020
  
    const difference = Math.abs(targetDate - now)
  
    // get the difference in milliseconds
    return Math.round(difference / oneDay)
  }

  const loggedIn = isLoggedIn()

  return (
    <Layout>
      <SEO title='Home' />

      {loading ? '' :
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Box mt={2} mb={2}>
                <Typography variant='h5'>
                  {numberEpisodesWatched}
                  &nbsp;watched&nbsp;
                  &mdash;
                  &nbsp;
                  {episodeData.length - numberEpisodesWatched}
                  &nbsp;left&nbsp;
                  &mdash;
                  &nbsp;
                  {graduationCounter()}
                  &nbsp;days until graduation
                </Typography>
              </Box>

              <Box fontWeight={300} mt={2} mb={2}>
                <Typography variant='h6' component='h6'>
                  {
                    Math.floor(((episodeData.length - numberEpisodesWatched) / graduationCounter()) * 100) / 100
                  }
                  &nbsp;episodes per day needed
                </Typography>
              </Box>
            </Grid>
          </Grid>
        }

      <section>
        <LoadingPlaceholder hidden={loading} />

        <Grid container spacing={4}>
          {loading ? '' : episodeData.map(episode => (
            <Grid item xs={6} sm={4} md={2} lg={2} xl={2}>
              <Card
                  episodeId={episode.episodeId}
                  episodeTitle={episode.episodeTitle}
                  imdbLink={episode.episodeImdbLink}
                  watchStatus={episode.watched}
                  manage={loggedIn}
                  >
              </Card>
            </Grid>
          ))}
        </Grid>

        <div data-netlify-identity-button></div>
      </section>
    </Layout>
  )
}

export default IndexPage
