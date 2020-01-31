import React from 'react'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

const Header = ({ siteTitle }) => (
  <header>
    <Box mt={3} mb={1}>
      <Typography variant='h2' component='h1'>
        The Office Binge
      </Typography>

      <Typography variant='subtitle1'>
        Tracking us watch the entirety of The Office before graduation.
      </Typography>
    </Box>
  </header>
)

export default Header
