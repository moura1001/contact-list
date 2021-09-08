let authError = null; 
let signUpSuccess = null;
let signUpError = null;
let user = JSON.parse(localStorage.getItem("contactUserToken"));
let signedIn = user ? true : false;

const initState = {
  authError,
  signUpSuccess,
  signUpError,
  signedIn
}

const authReducer = (state = initState, action) => {
  switch(action.type){
    case 'LOGIN_ERROR':
      console.log('login error');
      return {
        ...state,
        authError: 'Login failed'
      }
    case 'LOGIN_SUCCESS':
      console.log('login success');
      return {
        ...state,
        authError: null,
        signedIn: true
      }
    case 'SIGNOUT_SUCCESS':
      console.log('signout success');
      return {
        ...state,
        signedIn: false
      }
    case 'SIGNUP_SUCCESS':
        console.log('signup success')
        return {
          ...state,
          authError: null,
          signUpSuccess: "Account successfully registered",
          signUpError: null
        }
    case 'SIGNUP_ERROR':
        console.log('signup error')
        return {
          ...state,
          signUpError: action.err,
          signUpSuccess: null
        }
    default:
      return state
  }
};

export default authReducer;