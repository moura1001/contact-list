import axios from 'axios';

export const cleanAuthErrors = () => {
  return {
    type: 'AUTH_ERROR',
    err: {status: false, msg: 'clean auth errors'}
  }
}

export const getAllContacts = () => {
  return (dispatch, getState) => {
    // make async call to database
    const token = JSON.parse(localStorage.getItem("contactUserToken"));
    if (token) {
      axios.get('/api/contacts',
        { headers: { "Authorization": `${token.type} ${token.token}` } }
      ).then(res => {
        const contacts = res.data.content;
        dispatch({ type: 'GETALL_SUCCESS', contacts });
      }).catch(err => {
        dispatch({ type: 'AUTH_ERROR', err });
      });
    } else
      dispatch({ type: 'AUTH_ERROR', err: {status: true, msg: 'UNAUTHENTICATED'} });
  }
};

export const createContact = (contact) => {
  return (dispatch, getState) => {
    // make async call to database
    const token = JSON.parse(localStorage.getItem("contactUserToken"));
    if (token) {
      axios.post('/api/contacts', contact,
        { headers: { "Authorization": `${token.type} ${token.token}` } }
      ).then(res => {
        const newContact = res.data;
        dispatch({ type: 'CREATE_CONTACT_SUCCESS', newContact });
      }).catch(err => {
        switch (err.response.status) {
          case 400:
            const msg = 'Invalid ' + err.response.data[0].field;
            dispatch({ type: 'CREATE_CONTACT_ERROR', err: msg });
            break;
          default:
            dispatch({ type: 'CREATE_CONTACT_ERROR', err: err.message });
        }
      });
    } else
      dispatch({ type: 'AUTH_ERROR', err: {status: true, msg: 'UNAUTHENTICATED'} });
  }
};

export const editContact = (id, contact) => {
  return (dispatch, getState) => {
    // make async call to database
    const token = JSON.parse(localStorage.getItem("contactUserToken"));
    if (token) {
      axios.put(`/api/contacts/${id}`, contact,
        { headers: { "Authorization": `${token.type} ${token.token}` } }
      ).then(res => {
        const contact = res.data;
        dispatch({ type: 'EDIT_CONTACT_SUCCESS', contact });
      }).catch(err => {
        switch (err.response.status) {
          case 400:
            const msg = 'Invalid ' + err.response.data[0].field;
            dispatch({ type: 'EDIT_CONTACT_ERROR', err: msg });
            break;
          default:
            dispatch({ type: 'EDIT_CONTACT_ERROR', err: err.message });
        }
      });
    } else
      dispatch({ type: 'AUTH_ERROR', err: {status: true, msg: 'UNAUTHENTICATED'} });
  }
};

export const deleteContact = (id) => {
  return (dispatch, getState) => {
    // make async call to database
    const token = JSON.parse(localStorage.getItem("contactUserToken"));
    if (token) {
      axios.delete(`/api/contacts/${id}`,
        { headers: { "Authorization": `${token.type} ${token.token}` } }
      ).then(res => {
        dispatch({ type: 'DELETE_CONTACT_SUCCESS', id });
      }).catch(err => {
        switch (err.response.status) {
          case 404:
            const msg = 'Contact not found';
            dispatch({ type: 'DELETE_CONTACT_ERROR', err: msg });
            break;
          default:
            dispatch({ type: 'DELETE_CONTACT_ERROR', err: err.message });
        }
      });
    } else
      dispatch({ type: 'AUTH_ERROR', err: {status: true, msg: 'UNAUTHENTICATED'} });
  }
};