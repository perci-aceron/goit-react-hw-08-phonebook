import React from 'react';
import { nanoid } from 'nanoid';
import Button from '@mui/material/Button';

const ContactItem = ({ contact, onDeleteContact }) => {
  const handleDelete = () => {
    onDeleteContact(contact.id);
  };

  return (
    <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
      <span style={{ marginRight: '10px' }}>
        {contact.name} - {contact.number}
      </span>
      <Button
        onClick={handleDelete}
        variant="contained"
        color="secondary"
        style={{
          color: 'white', 
          backgroundColor: 'red', 
          marginLeft: 'auto',
          padding: '5px 10px',
        }}
      >
        Delete
      </Button>
    </li>
  );
};

const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {contacts.map((contact) => (
        <ContactItem key={nanoid()} contact={contact} onDeleteContact={onDeleteContact} />
      ))}
    </ul>
  );
};

export default ContactList;
