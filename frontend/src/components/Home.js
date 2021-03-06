import React, { Component } from 'react';
import TableContact from './Contact/TableContact';
import AddContact from './Contact/AddContact';
import { connect } from 'react-redux';
import { getAllContacts, cleanAuthErrors } from '../store/actions/contactActions';
import { signOut } from '../store/actions/authActions';
import { Redirect } from 'react-router-dom';

class Home extends Component {
  componentWillMount(){
    this.props.getAllContacts();
  }
  render(){
    const { contacts, signedIn, authError } = this.props;
    if (!signedIn || authError){
      this.props.signOut();
      this.props.cleanAuthErrors();
      return <Redirect to='/' />
    }
    const contactList = (contacts && contacts.length) ? (
      <TableContact contacts={contacts} />
    ) : (
      <div className="center">No contacts to show</div>
    );
    return(
      <div className="home container">
        <AddContact />
        {contactList}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    contacts: state.contact.contacts,
    authError: state.contact.authError,
    signedIn: state.auth.signedIn
  }
}

const mapDispatchToProps = (dispatch)=> {
  return {
    getAllContacts: () => dispatch(getAllContacts()),
    signOut: () => dispatch(signOut()),
    cleanAuthErrors: () => dispatch(cleanAuthErrors())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)