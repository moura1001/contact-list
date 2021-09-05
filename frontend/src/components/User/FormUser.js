import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import FormUserValidation from '../../validation/FormUserValidation';

class FormUser extends Component {
  state = {
    email: "",
    password: "",
    results: {}
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleResults = (results) => {
    if (Object.keys(results).length === 0) {
      this.setState({
        email: "",
        password: ""
      })
    }
    this.setState({
      results: results
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();

    let user = {
      email: this.state.email, password: this.state.password
    };

    const errors = FormUserValidation(user);
    this.setState({
      results: errors
    });

    if (Object.keys(errors).length === 0) {
      this.props.handleSubmit(user, this.handleResults);
    }
  }

  render() {
    let ButtonImage = this.props.buttonImage
    return (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3 center">{this.props.title}</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id='email' onChange={this.handleChange} required
              value={this.state.email} />
            <span style={{ color: "red" }}>{this.state.results["email"]}</span>
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id='password' onChange={this.handleChange} required
              value={this.state.password} />
            <span style={{ color: "red" }}>{this.state.results["password"]}</span>
          </div>
          <div className="input-field">
            <span style={{ color: "red" }}>{this.state.results["error"]}</span>
            <span style={{ color: "green" }}>{this.state.results["ok"]}</span>
          </div>
          <div className="input-field center">
            <IconButton type="submit">
              <ButtonImage fontSize="large" />
            </IconButton>
          </div>
        </form>
      </div>
    )
  }
}

export default FormUser