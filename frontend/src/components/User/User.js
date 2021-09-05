import React from 'react';
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

    }).catch(err => {
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
      results["error"] = "This email is already registered";
    })
    .finally(() => handleResults(results));
  }
  return (
    <div className="user-forms container">
      <div className="row">
        <div className="col s12 m6">
          <FormUser title="Login" buttonImage={ExitToAppIcon}
            handleSubmit={handleSubmitLogin} />
        </div>
        <div className="col s12 m5 offset-m1">
          <FormUser title="Register" buttonImage={PersonAddIcon}
            handleSubmit={handleSubmitRegister} />
        </div>
      </div>
    </div>
  )
}

export default User