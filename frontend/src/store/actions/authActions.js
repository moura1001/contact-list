import axios from 'axios';

export const signIn = (credentials) => {
  return async (dispatch, getState) => {
    axios.post('/api/auth', credentials).then(res => {
      const userLogin = res.data;
      localStorage.setItem("contactUserToken", JSON.stringify(userLogin));
      dispatch({ type: 'LOGIN_SUCCESS' });
    }).catch(err => {
      dispatch({ type: 'LOGIN_ERROR', err });
    });
  }
}

export const signOut = () => {
  localStorage.clear();
  return {
    type: 'SIGNOUT_SUCCESS'
  }
}

export const signUp = (newUser) => {
  return (dispatch, getState) => {
    axios.post('/api/accounts', newUser).then(() => {
      dispatch({ type: 'SIGNUP_SUCCESS' });
    })
    .catch(err => {
      switch(err.response.status){
        case 409:
          dispatch({ type: 'SIGNUP_ERROR', err: 'This email is already registered' });
          break;
        case 400:
          const msg = 'Invalid ' + err.response.data[0].field;
          dispatch({ type: 'SIGNUP_ERROR', err: msg });
          break;
        default:
          dispatch({ type: 'SIGNUP_ERROR', err: err.message});
      }
    });
  }
}