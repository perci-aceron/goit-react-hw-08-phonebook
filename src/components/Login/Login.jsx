import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logIn } from '../../redux/auth/operations';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const result = await dispatch(logIn(formData));
      if (result.error) {
        throw new Error('Login failed');
      }
      navigate('/goit-react-hw-08-phonebook');
    } catch (error) {
      alert('Login error: ' + error.message);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh',
      }}
    >
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <TextField
            type="email"
            name="email"
            label="Email"
            variant="outlined"
            onChange={handleChange}
            value={formData.email}
            autoComplete="email"
          />
          <TextField
            type="password"
            name="password"
            label="Password"
            variant="outlined"
            onChange={handleChange}
            value={formData.password}
          />
          <Button type="submit" variant="contained" color="primary">
            Log In
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default LoginForm;
