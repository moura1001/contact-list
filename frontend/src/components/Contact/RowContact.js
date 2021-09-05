import React, { Component } from 'react';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import FormContactValidation from '../../validation/FormContactValidation';

class RowContact extends Component {
  state = {
    name: this.props.contact.name,
    email: this.props.contact.email,
    address: this.props.contact.address,
    telephone: this.props.contact.telephone,
    open: false,
    errors: {}
  }
  setOpen = () => {
    const open = !this.state.open;
    this.setState({
      open
    })
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
      //console.log(contact);
      this.props.editContact(this.props.contact.id, contact);
      this.setOpen();
    }

  }
  handleDelete = () => {
    //console.log(this.state);
    this.props.deleteContact(this.props.contact.id);
  }
  render() {
    const { contact } = this.props;
    return (
      <React.Fragment>
        <TableRow>
          <TableCell>{contact.name}</TableCell>
          <TableCell>{contact.email}</TableCell>
          <TableCell>{contact.address}</TableCell>
          <TableCell>{contact.telephone}</TableCell>
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={this.setOpen}>
              <EditIcon />
            </IconButton>
          </TableCell>
          <TableCell>
            <IconButton size="small" onClick={this.handleDelete}>
              <DeleteIcon />
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={6}>
            <Collapse in={this.state.open} timeout="auto" unmountOnExit>
              <div className="user-form-edit container">
                <form className="white" onSubmit={this.handleSubmit}>
                  <div className="row">
                    <div className="col s12 m3">
                      <label htmlFor="name">Name</label>
                      <input type="text" id="name" onChange={this.handleChange} required
                        value={this.state.name} />
                      <span style={{ color: "red" }}>{this.state.errors["name"]}</span>
                    </div>
                    <div className="col s12 m3">
                      <label htmlFor="email">Email</label>
                      <input type="text" id="email" onChange={this.handleChange} required
                        value={this.state.email} />
                      <span style={{ color: "red" }}>{this.state.errors["email"]}</span>
                    </div>
                    <div className="col s12 m3">
                      <label htmlFor="address">Address</label>
                      <input type="text" id="address" onChange={this.handleChange} required
                        value={this.state.address} />
                      <span style={{ color: "red" }}>{this.state.errors["address"]}</span>
                    </div>
                    <div className="col s12 m3">
                      <label htmlFor="telephone">Telephone</label>
                      <input type="text" id="telephone" onChange={this.handleChange} required
                        value={this.state.telephone} />
                      <span style={{ color: "red" }}>{this.state.errors["telephone"]}</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s12 m2 offset-m4">
                      <IconButton aria-label="expand row" size="small"
                        type="submit" onClick={this.handleSubmit}>
                        <DoneIcon />
                      </IconButton>
                    </div>
                    <div className="col s12 m2">
                      <IconButton aria-label="expand row" size="small"
                        type="button" onClick={this.setOpen}>
                        <CloseIcon />
                      </IconButton>
                    </div>
                  </div>
                </form>
              </div>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    )
  }
}

export default RowContact