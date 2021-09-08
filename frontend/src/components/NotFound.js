import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import RefreshIcon from '@material-ui/icons/Refresh';
import Container from '@material-ui/core/Container';

const NotFound = (props) => {
  return (
    <Container style={{ minHeight: '80vh', justifyContent: "space-between"}}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Typography variant="h3">
          That page cannot be found
        </Typography>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          color="default"
          endIcon={<RefreshIcon />}
          onClick={() => props.history.push("/")}
        >
          Retry
        </Button>
      </div>
    </Container>
  )
}

export default NotFound