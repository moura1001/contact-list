import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const NavBar = (props) => {
  return (
    <Box
      display="flex"
      flex="1"
      justifyContent="space-around"
      style={{ height: "10vh", color: "white", background: "#2e7d32" }}
    >
      <Typography variant="h4">
        {props.title}
      </Typography>
    </Box>
  )
}

export default NavBar