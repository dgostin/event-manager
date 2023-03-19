import React from 'react';
import { Box, Typography } from '@material-ui/core';

function Jumbotron({ title, variant }) {

  return (
    <Box
        py={6}
    >
      <Typography variant={variant || 'h3'} align="center" gutterBottom>
        {title}
      </Typography>
    </Box>
  );
}

export default Jumbotron;
