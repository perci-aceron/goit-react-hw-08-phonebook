import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';

const ContactForm = ({ contacts, onAddContact }) => {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
  });

  const handleChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = event => {
    event.preventDefault();

    const { name, number } = formData;

    const isContactExists = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isContactExists) {
      alert('Contact with this name already exists!');
    } else {
      onAddContact(name, number);
      setFormData({
        name: '',
        number: '',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <InputLabel htmlFor="name">Name</InputLabel>
        <TextField
          type="text"
          name="name"
          variant="outlined"
          id="name"
          style={{ padding: '5px' }}
          pattern="^[A-Za-z\u0080-\uFFFF ']+$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={formData.name}
          onChange={handleChange}
          autoComplete="name"
        />

        <InputLabel htmlFor="number">Phone Number</InputLabel>
        <TextField
          type="tel"
          name="number"
          variant="outlined"
          id="number"
          style={{ padding: '5px' }}
          pattern="^(\+?[0-9.\(\)\-\s]*)$"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={formData.number}
          onChange={handleChange}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ padding: '8px 20px' }}
        >
          Add Contact
        </Button>
      </Box>
    </form>
  );
};

export default ContactForm;
