import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from '../redux/contactsSlice';
import { authReducer } from '../redux/auth/slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    contacts: contactsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

