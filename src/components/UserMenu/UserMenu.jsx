import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../redux/auth/operations';
import { useNavigate } from 'react-router-dom';
import { clearContacts } from '../../redux/contactsSlice';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const UserMenu = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useSelector(state => state.auth.user.email);
  const userMenuRef = useRef(null);

  const handleLogout = () => {
    dispatch(clearContacts());
    dispatch(logOut());
    onClose();
    navigate('/login');
  };

  const handleClose = () => {
    onClose();
  };

  const handleBackgroundClick = event => {
    if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
      handleClose();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleBackgroundClick);
    return () => {
      document.removeEventListener('click', handleBackgroundClick);
    };
  });

  return (
    <Box
      ref={userMenuRef}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        width: '100%',
        height: '100%',
        maxHeight: '200px',
        maxWidth: '300px',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Typography variant="h6" component="h2" gutterBottom>
        {email}
      </Typography>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        sx={{ mt: 3, mb: 2 }}
        onClick={handleLogout}
      >
        Logout
      </Button>

      <Button
        variant="outlined"
        onClick={handleClose}
        fullWidth
        sx={{ mt: 2, mb: 2 }}
      >
        Close
      </Button>
    </Box>
  );
};

export default UserMenu;
