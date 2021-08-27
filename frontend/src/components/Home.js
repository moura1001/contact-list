import React, { Component } from 'react';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import TableContact from './Contact/TableContact';
import AddContact from './Contact/AddContact';
import IconButton from '@material-ui/core/IconButton';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import Error from './Error';

class Home extends Component {
  state = {
    contacts: [],
    error: null
  }
  componentDidMount(){
    const token = JSON.parse(localStorage.getItem("contactUserToken"));
    axios.get('/api/contacts', { headers: {"Authorization" : `${token.type} ${token.token}`} })
      .then(res =>{
        this.setState({
          contacts: res.data.content
        });
      })
      .catch(err => {
        console.log(err.message);
        this.setState({
          error: err.message
        });
      });
  }
  deleteContact = (id) => {
    const token = JSON.parse(localStorage.getItem("contactUserToken"));
    axios.delete(`/api/contacts/${id}`, { headers: {"Authorization" : `${token.type} ${token.token}`} });
    const contacts = this.state.contacts.filter(contact => {
      return contact.id !== id;
    });
    this.setState({
      contacts
    })
  }
  addContact = (contact) => {
    const token = JSON.parse(localStorage.getItem("contactUserToken"));
    axios.post('/api/contacts', contact, { headers: {"Authorization" : `${token.type} ${token.token}`} }).then(res =>{
      const newContact = res.data;
      const contacts = [...this.state.contacts, newContact];
      this.setState({
        contacts
      })
    });
  }
  editContact = (id, contact) => {
    const token = JSON.parse(localStorage.getItem("contactUserToken"));
    axios.put(`/api/contacts/${id}`, contact, { headers: {"Authorization" : `${token.type} ${token.token}`} }).then(res => {
      const editContact = res.data;
      const contacts = this.state.contacts.slice();
      const index = contacts.map(function(x) {return x.id;}).indexOf(id);
      contacts[index] = editContact;
      this.setState({
        contacts
      })
    });
  }
  handleExit = () => {
    console.log("Logout");
    localStorage.setItem("contactUserToken", JSON.stringify({type:"",token:""}));
    this.props.history.push("/");
  }
  render(){
    const { contacts } = this.state
    const contactList = contacts.length ? (
      <TableContact contacts={contacts} deleteContact={this.deleteContact}
        editContact={this.editContact} />
    ) : (
      <div className="center">No contacts to show</div>
    );

    return(
      <Container style={{ minHeight: '80vh', justifyContent: "space-between"}}>
        {this.state.error && <Error message={this.state.error} />}
        {!this.state.error &&
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <AddContact addContact={this.addContact} />
            <div style={{ alignSelf: 'flex-start' }}>
              <IconButton type="button" onClick={this.handleExit}>
                <PowerSettingsNewIcon fontSize="large" />
                Exit
              </IconButton>
            </div>
          </div>
          {contactList}
        </div>
        }
      </Container>
    )
  }
}

export default Home