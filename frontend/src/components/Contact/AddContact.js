import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux';
import { createContact } from '../../store/actions/contactActions';

class AddContact extends Component {
  state = {
    name: "",
    email: "",
    address: "",
    telephone: ""
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createContact(this.state);
    if(!this.props.error) {
      this.setState({
        name: "",
        email: "",
        address: "",
        telephone: "",
      })
    }
  }
  render() {
    const { error } = this.props;
    return (
      <div className="user-form-add container">
        <form className="white" onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col s12 m6">
              <div className="input-field">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" onChange={this.handleChange} required
                  value={this.state.name} />
              </div>
              <div className="input-field">
                <label htmlFor="address">Address</label>
                <input type="text" id="address" onChange={this.handleChange} required
                  value={this.state.address} />
              </div>
            </div>
            <div className="col s12 m6">
              <div className="input-field">
                <label htmlFor="email">Email</label>
                <input type="text" id="email" onChange={this.handleChange} required
                  value={this.state.email} />
              </div>
              <div className="input-field">
                <label htmlFor="telephone">Telephone</label>
                <input type="text" id="telephone" onChange={this.handleChange} required
                  value={this.state.telephone} />
              </div>
            </div>
          </div>
          <div className="row center">
            <div className="input-field">
              <IconButton type="submit">
                <AddIcon fontSize="large" />
              </IconButton>
              <div className="red-text center">
                { error ? <p>{error}</p> : null }
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    error: state.contact.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createContact: (contact) => dispatch(createContact(contact))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddContact)