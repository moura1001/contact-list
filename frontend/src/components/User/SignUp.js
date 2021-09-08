import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { connect } from 'react-redux';
import { signUp } from '../../store/actions/authActions';

class SignUp extends Component {
  state = {
    email: "",
    password: ""
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signUp(this.state)
  }

  render() {
    const { signUpSuccess, signUpError } = this.props;
    return (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3 center">Register</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id='email' onChange={this.handleChange} required
              value={this.state.email} />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id='password' onChange={this.handleChange} required
              value={this.state.password} />
          </div>
          <div className="input-field center">
            <IconButton type="submit">
              <PersonAddIcon fontSize="large" />
            </IconButton>
            <div className="red-text center">
              { signUpError ? <p>{signUpError}</p> : null }
            </div>
            <div className="green-text center">
              { signUpSuccess ? <p>{signUpSuccess}</p> : null }
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    signUpSuccess: state.auth.signUpSuccess,
    signUpError: state.auth.signUpError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (creds) => dispatch(signUp(creds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)