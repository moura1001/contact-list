import React from 'react';
import { withRouter} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import RefreshIcon from '@material-ui/icons/Refresh';

const Error = (props) => {
  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Typography variant="h3">
          {props.message}
        </Typography>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          color="default"
          endIcon={<RefreshIcon />}
          onClick={() => props.history.push("/")}
        >
          Retry with login
        </Button>
      </div>
    </div>
  )
}

export default withRouter(Error)