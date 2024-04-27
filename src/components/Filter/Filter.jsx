import React from 'react';
import TextField from '@mui/material/TextField';

const Filter = ({ value, onChange }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
      <label htmlFor="filter" style={{ marginBottom: '5px' }}>
        Filter contacts by name:
      </label>
      <TextField
        type="text"
        id="filter"
        name="filter"
        value={value}
        onChange={onChange}
        variant="outlined"
        style={{ padding: '5px' }}
      />
    </div>
  );
};

export default Filter;
