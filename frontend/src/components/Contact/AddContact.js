import React, { Component } from 'react';
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
    e.preventDefault();

    const contact = {
      name: this.state.name, email: this.state.email,
      address: this.state.address, telephone: this.state.telephone
    };

    const errors = FormContactValidation(contact);
    this.setState({
      errors: errors
    });

    if (Object.keys(errors).length === 0) {
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
      <div className="user-form-add container">
        <form className="white" onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col s12 m6">
              <div className="input-field">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" onChange={this.handleChange} required
                  value={this.state.name} />
                <span style={{ color: "red" }}>{this.state.errors["name"]}</span>
              </div>
              <div className="input-field">
                <label htmlFor="address">Address</label>
                <input type="text" id="address" onChange={this.handleChange} required
                  value={this.state.address} />
                <span style={{ color: "red" }}>{this.state.errors["address"]}</span>
              </div>
            </div>
            <div className="col s12 m6">
              <div className="input-field">
                <label htmlFor="email">Email</label>
                <input type="text" id="email" onChange={this.handleChange} required
                  value={this.state.email} />
                <span style={{ color: "red" }}>{this.state.errors["email"]}</span>
              </div>
              <div className="input-field">
                <label htmlFor="telephone">Telephone</label>
                <input type="text" id="telephone" onChange={this.handleChange} required
                  value={this.state.telephone} />
                <span style={{ color: "red" }}>{this.state.errors["telephone"]}</span>
              </div>
            </div>
          </div>
          <div className="row center">
            <div className="input-field">
              <IconButton type="submit">
                <AddIcon fontSize="large" />
              </IconButton>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default AddContact