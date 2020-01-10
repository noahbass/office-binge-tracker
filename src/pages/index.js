import React from 'react'
import { Link } from 'gatsby'

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Card from '../components/Card'


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

  return (
    <Layout>
      <SEO title='Home' />

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>xs=12</Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>xs=12 sm=6</Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>xs=12 sm=6</Paper>
        </Grid>
        <Grid item xs={6} sm={2}>
          <Card episodeId='s1ep1'></Card>
        </Grid>
        <Grid item xs={6} sm={2}>
          <Card episodeId='s1ep2'></Card>
        </Grid>
        <Grid item xs={6} sm={2}>
          <Card></Card>
        </Grid>
        <Grid item xs={6} sm={2}>
          <Card></Card>
        </Grid>
        <Grid item xs={6} sm={2}>
          <Card></Card>
        </Grid>
        <Grid item xs={6} sm={2}>
          <Card></Card>
        </Grid>
        <Grid item xs={6} sm={2}>
          <Card></Card>
        </Grid>
        <Grid item xs={6} sm={2}>
          <Card></Card>
        </Grid>
        <Grid item xs={6} sm={2}>
          <Card></Card>
        </Grid>
        <Grid item xs={6} sm={2}>
          <Card></Card>
        </Grid>
        <Grid item xs={6} sm={2}>
          <Card></Card>
        </Grid>
        <Grid item xs={6} sm={2}>
          <Card></Card>
        </Grid>
        <Grid item xs={6} sm={2}>
          <Card></Card>
        </Grid>
        <Grid item xs={6} sm={2}>
          <Card></Card>
        </Grid>
        <Grid item xs={6} sm={2}>
          <Card></Card>
        </Grid>
        <Grid item xs={6} sm={2}>
          <Card></Card>
        </Grid>
        <Grid item xs={6} sm={2}>
          <Card></Card>
        </Grid>
        <Grid item xs={6} sm={2}>
          <Card></Card>
        </Grid>
        <Grid item xs={6} sm={2}>
          <Card></Card>
        </Grid>
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
