import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import FormUserValidation from '../../validation/FormUserValidation';
import Typography from '@material-ui/core/Typography';

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
      <Grid item xs={6}>
        <Typography variant="h6">
          {this.props.title}
        </Typography>
        <React.Fragment>
          <form>
            <Grid item xs={10}>
              <label htmlFor="email">Email</label>
              <input type="text" id="email" onChange={this.handleChange} required
                value={this.state.email} />
              <span style={{ color: "red" }}>{this.state.results["email"]}</span>
            </Grid>
            <Grid item xs={10}>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" onChange={this.handleChange} required
                value={this.state.password} />
              <span style={{ color: "red" }}>{this.state.results["password"]}</span>
            </Grid>
            <Grid>
              <Grid item xs={6}>
                <IconButton type="button" onClick={this.handleSubmit}>
                  <ButtonImage fontSize="large" />
                </IconButton>
              </Grid>
            </Grid>
          </form>
        </React.Fragment>
        <span style={{ color: "red" }}>{this.state.results["error"]}</span>
        <span style={{ color: "green" }}>{this.state.results["ok"]}</span>
      </Grid>
    )
  }
}

export default FormUser