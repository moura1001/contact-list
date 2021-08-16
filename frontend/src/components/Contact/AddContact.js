import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import FormContactValidation from '../../validation/FormContactValidation';

class AddContact extends Component {
  state = {
    name: "",
    email: "",
    address: "",
    telephone: "",
    errors: {}
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    const contact = {name:this.state.name, email:this.state.email,
      address:this.state.address, telephone:this.state.telephone};
    
    const errors = FormContactValidation(contact);
    this.setState({
      errors: errors
    });

    if(Object.keys(errors).length === 0){
      //console.log(this.state);
      this.props.addContact(contact);
      this.setState({
        name: "",
        email: "",
        address: "",
        telephone: "",
      })
    }

  }
  render() {
    return (
      <Box margin={2} align="center" >
        <React.Fragment>
          <form>
            <Grid container spacing={2} align="center">
              <Grid item xs={5}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" onChange={this.handleChange} required
                  value={this.state.name} />
                <span style={{color: "red"}}>{this.state.errors["name"]}</span>
              </Grid>
              <Grid item xs={5}>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" onChange={this.handleChange} required
                  value={this.state.email} />
                <span style={{color: "red"}}>{this.state.errors["email"]}</span>
              </Grid>
            </Grid>
            <Grid container spacing={2} align="center">
              <Grid item xs={5}>
                <label htmlFor="address">Address</label>
                <input type="text" id="address" onChange={this.handleChange} required
                  value={this.state.address} />
                <span style={{color: "red"}}>{this.state.errors["address"]}</span>
              </Grid>
              <Grid item xs={5}>
                <label htmlFor="telephone">Telephone</label>
                <input type="text" id="telephone" onChange={this.handleChange} required
                  value={this.state.telephone} />
                <span style={{color: "red"}}>{this.state.errors["telephone"]}</span>
              </Grid>
            </Grid>
            <Grid>
              <Grid item xs={2}>
                <IconButton type="button" onClick={this.handleSubmit}>
                  <AddIcon fontSize="large" />
                </IconButton>
              </Grid>
            </Grid>
          </form>
        </React.Fragment>
      </Box>
    )
  }
}

export default AddContact