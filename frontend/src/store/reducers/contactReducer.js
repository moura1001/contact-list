const initState = {
  contacts: [],
  addError: null,
  editError: null,
  deleteError: null,
  authError: false
}

const contactReducer = (state = initState, action) => {
  switch (action.type) {
    case 'AUTH_ERROR':
      console.log('auth error: ', action.err.msg);
      return {
        authError: action.err.status
      }
    case 'GETALL_SUCCESS':
      console.log('get contacts success');
      return {
        contacts: action.contacts,
        authError: false
      }
    case 'CREATE_CONTACT_SUCCESS':
      console.log('create contact success', action.newContact);
      const newContacts = [...state.contacts, action.newContact];
      return {
        contacts: newContacts,
        addError: null
      }
    case 'CREATE_CONTACT_ERROR':
      console.log('create contact error: ', action.err);
      return {
        ...state,
        addError: action.err
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
        editError: null
      }
    case 'EDIT_CONTACT_ERROR':
      console.log('edit contact error: ', action.err);
      return {
        ...state,
        editError: action.err
      };
    case 'DELETE_CONTACT_SUCCESS':
      console.log('delete contact success: ', action.id);
      const contacts = state.contacts.filter(contact => {
        return contact.id !== action.id;
      });
      return {
        contacts,
        deleteError: null
      }
    case 'DELETE_CONTACT_ERROR':
      console.log('delete contact error: ', action.err);
      return {
        ...state,
        deleteError: action.err
      };
    default:
      return state;
  }
};

export default contactReducer;