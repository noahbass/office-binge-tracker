import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'


const Footer = () => {
  const commitData = useStaticQuery(graphql`
      {
        gitCommit(latest: { eq: true }) {
          hash
        }
      }
    `)

  return (
    <footer>
      <Box fontWeight='fontWeightLight' mt={3} mb={3}>
        <Typography variant='caption' display='block'>
          {commitData.gitCommit.hash.substring(0, 6)}
        </Typography>
      </Box>
    </footer>
  )
}

export default Footer
