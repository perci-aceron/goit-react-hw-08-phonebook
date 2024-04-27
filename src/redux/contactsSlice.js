import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { selectToken } from '../redux/auth/slice'; 

export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async (_, { getState }) => {
  const token = selectToken(getState()); 
  const response = await fetch('https://connections-api.herokuapp.com/contacts', {
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });
  const data = await response.json();
  return data;
});

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    filter: '',
    isContactsLoaded: false,
    loadedContactIds: [],
  },
  reducers: {
    addContact: (state, action) => {
      state.contacts.push(action.payload);
    },
    deleteContact: (state, action) => {
      state.contacts = state.contacts.filter((contact) => contact.id !== action.payload);
    },
    updateFilter: (state, action) => {
      state.filter = action.payload;
    },
    clearContacts(state) {
      state.contacts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        action.payload.forEach((contact) => {
          if (!state.loadedContactIds.includes(contact.id)) {
            state.contacts.push(contact);
            state.loadedContactIds.push(contact.id);
          }
        });
        state.isContactsLoaded = true;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
      });
  },
});

export const { addContact, deleteContact, updateFilter, clearContacts } = contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;

