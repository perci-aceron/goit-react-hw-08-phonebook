import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addContact,
  deleteContact,
  updateFilter,
  fetchContacts,
} from '../redux/contactsSlice';
import { selectToken } from '../redux/auth/slice';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const App = () => {
  const [isContactsLoaded, setIsContactsLoaded] = useState(false);
  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.contacts.filter);
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  useEffect(() => {
    if (!isContactsLoaded) {
      dispatch(fetchContacts())
        .then(() => {
          setIsContactsLoaded(true);
        })
        .catch(error => {
          console.error('Error fetching contacts:', error);
        });
    }
  }, [dispatch, isContactsLoaded]);

  const handleAddContact = (name, number) => {
    const newContact = {
      name: name,
      number: number,
    };

    fetch('https://connections-api.herokuapp.com/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newContact),
    })
      .then(response => response.json())
      .then(data => {
        newContact.id = data.id;
        dispatch(addContact(newContact));
      })
      .catch(error => {
        console.error('Error saving contact to the server:', error);
      });
  };

  const handleDeleteContact = id => {
    fetch(`https://connections-api.herokuapp.com/contacts/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        if (response.ok) {
          dispatch(deleteContact(id));
        } else {
          console.error('Failed to delete contact from server');
        }
      })
      .catch(error => {
        console.error('Error deleting contact from server:', error);
      });
  };

  const handleFilterChange = event => {
    dispatch(updateFilter(event.target.value));
  };

  const filteredContacts = filter
    ? contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      )
    : contacts;

  return (
    <Container maxWidth="sm" style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Phonebook
      </Typography>
      <ContactForm contacts={contacts} onAddContact={handleAddContact} />

      <Typography variant="h5" style={{ marginTop: '40px' }} gutterBottom>
        Contacts
      </Typography>
      <Filter value={filter} onChange={handleFilterChange} />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={handleDeleteContact}
      />
    </Container>
  );
};

export default App;
