const initState = {
  contacts: [],
  error: null,
  authError: false
}

const contactReducer = (state = initState, action) => {
  switch (action.type) {
    case 'AUTH_ERROR':
      console.log('auth error: ', action.err);
      return {
        ...state,
        authError: true
      }
    case 'GETALL_SUCCESS':
      console.log('get contacts success');
      return {
        ...state,
        contacts: action.contacts,
        authError: false
      }
    case 'CREATE_CONTACT_SUCCESS':
      console.log('create contact success', action.newContact);
      const newContacts = [...state.contacts, action.newContact];
      return {
        ...state,
        contacts: newContacts,
        error: null
      }
    case 'CREATE_CONTACT_ERROR':
      console.log('create contact error: ', action.err);
      return {
        ...state,
        error: action.err
      };
    case 'EDIT_CONTACT_SUCCESS':
      const editContact = action.contact;
      const editContacts = state.contacts.slice();
      const index = editContacts.map(c => c.id).indexOf(editContact.id);
      editContacts[index] = editContact;
      console.log('edit contact success', action.contact);
      return {
        ...state,
        contacts: editContacts,
        error: null
      }
    case 'EDIT_CONTACT_ERROR':
      console.log('edit contact error: ', action.err);
      return {
        ...state,
        error: action.err
      };
    case 'DELETE_CONTACT_SUCCESS':
      console.log('delete contact success: ', action.id);
      const contacts = state.contacts.filter(contact => {
        return contact.id !== action.id;
      });
      return {
        ...state,
        contacts,
        error: null
      }
    case 'DELETE_CONTACT_ERROR':
      console.log('delete contact error: ', action.err);
      return {
        ...state,
        error: action.err
      };
    default:
      return state;
  }
};

export default contactReducer;