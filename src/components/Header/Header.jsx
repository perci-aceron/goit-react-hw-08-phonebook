import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserMenu from '../UserMenu/UserMenu';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

const Header = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  const handleUserMenuOpen = () => {
    setIsUserMenuOpen(true);
  };

  const handleUserMenuClose = () => {
    setIsUserMenuOpen(false);
  };

  return (
    <AppBar position="static" color="default">
      <Toolbar style={{ margin: 'auto' }}>
        <div>
          <Button
            component={Link}
            to="/goit-react-hw-08-phonebook"
            color="inherit"
          >
            Contacts
          </Button>
        </div>
        <div style={{ marginLeft: '100px' }}>
          {!isLoggedIn ? (
            <>
              <Button component={Link} to="/login" color="inherit">
                Login
              </Button>
              <Button
                component={Link}
                to="/registration"
                color="inherit"
                sx={{ marginLeft: '10px' }}
              >
                Registration
              </Button>
            </>
          ) : (
            <Button
              onClick={handleUserMenuOpen}
              color="inherit"
              sx={{ marginLeft: '10px' }}
            >
              User Menu
            </Button>
          )}
        </div>

        {isUserMenuOpen && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(0, 0, 0, 0.3)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 9999,
            }}
          >
            <div>
              <UserMenu onClose={handleUserMenuClose} />
            </div>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
