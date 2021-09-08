import React from 'react';
import SigIng from './SignIn';
import SignUp from './SignUp';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

const User = (props) => {
  const { signedIn } = props;
  if (signedIn) return <Redirect to='/contacts' />
  return (
    <div className="user-forms container">
      <div className="row">
        <div className="col s12 m6">
          <SigIng />
        </div>
        <div className="col s12 m6">
          <SignUp />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return{
    signedIn: state.auth.signedIn
  }
}

export default connect(mapStateToProps)(User)