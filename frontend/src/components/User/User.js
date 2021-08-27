import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import FormUser from './FormUser';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

const User = (props) => {
  const handleSubmitLogin = (user, handleResults) => {
    let results = {};

    axios.post('/api/auth', user).then(res => {
      const userLogin = res.data;
      localStorage.setItem("contactUserToken", JSON.stringify(userLogin));
      props.history.push("/contacts");

    }).catch((error) => {
      console.log({ ...error });
      results["error"] = "Incorrect email or password";
      handleResults(results);
    });
  }
  const handleSubmitRegister = (user, handleResults) => {
    let results = {};

    axios.post('/api/accounts', user).then(res => {
      results["ok"] = "Account successfully registered";
    })
    .catch(err => {
      console.log({ ...err });
      results["error"] = "This email is already registered";
    })
    .finally(() => handleResults(results));
  }
  return (
    <Box margin={8} style={{ minHeight: '60vh', justifyContent: "space-between"}} >
      <Grid container spacing={2} align="center">
        <FormUser title="Login" buttonImage={ExitToAppIcon}
          handleSubmit={handleSubmitLogin} />

        <FormUser title="Register" buttonImage={PersonAddIcon}
          handleSubmit={handleSubmitRegister} />
      </Grid>
    </Box>
  )
}

export default User