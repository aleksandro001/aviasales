import { configureStore } from '@reduxjs/toolkit';
import ticketReducer from './ticketsList';

export default configureStore({
  reducer: {
    tickets: ticketReducer,
  },
});
