/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';

import getFlyDuration from '../utils/getFlyDuration';
import { getCookie } from '../utils/cookies';

export const getSearchIdFromApi = createAsyncThunk('aviasales/getSearchId', async (arg, { rejectWithValue }) =>
  fetch('https://aviasales-test-api.kata.academy/search')
    .then(async (response) => (response.ok ? response.json() : { searchId: null }))
    .catch((error) => rejectWithValue(error.message))
);

export const getTicketsFromApi = createAsyncThunk('aviasales/getTickets', async (arg, { rejectWithValue }) =>
  fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${getCookie('searchId')}`)
    .then(async (response) => (response.ok ? response.json() : { tickets: [], stop: false }))
    .catch((error) => rejectWithValue(error.message))
);

const ticketsList = createSlice({
  name: 'tickets',
  initialState: {
    tickets: [],
    valueFilterTransfer: [],
    showAllTickets: true,
    ticketsDisplayed: 5,
    stopFetch: false,
    isLoaded: true,
    error: false,
    searchId: false,
  },
  reducers: {
    showMoreTickets(state) {
      state.ticketsDisplayed += 5;
    },

    sortTicketsByPrice(state) {
      const filterTickets = current(state.tickets).slice();
      state.tickets = filterTickets.sort((previous, next) => (previous.price > next.price ? 1 : -1));
    },

    sortTicketsByDuration(state) {
      const filterTickets = current(state.tickets).slice();
      state.tickets = filterTickets.sort((previous, next) =>
        getFlyDuration(previous) > getFlyDuration(next) ? 1 : -1
      );
    },

    switchFilterAll(state, action) {
      state.showAllTickets = action.payload;
    },

    setValueFilterTicket(state, action) {
      if (action.payload.isChecked) {
        state.valueFilterTransfer.push(action.payload.filterValue);
      } else {
        state.valueFilterTransfer = state.valueFilterTransfer.filter((item) => item !== action.payload.filterValue);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSearchIdFromApi.pending, (state) => {
      state.isLoaded = false;
      state.error = false;
    });

    builder.addCase(getTicketsFromApi.pending, (state) => {
      state.isLoaded = false;
      state.error = false;
    });

    builder.addCase(getSearchIdFromApi.fulfilled, (state, action) => {
      document.cookie = `searchId = ${action.payload.searchId}`;
      state.searchId = true;
    });

    builder.addCase(getTicketsFromApi.fulfilled, (state, action) => {
      state.tickets = [...state.tickets, ...action.payload.tickets];
      state.stopFetch = action.payload.stop;
      state.isLoaded = action.payload.stop;
    });

    builder.addCase(getSearchIdFromApi.rejected, (state) => {
      state.error = true;
    });

    builder.addCase(getTicketsFromApi.rejected, (state, action) => {
      if (action.payload !== '500') {
        state.isLoaded = true;
        state.error = true;
      }
    });
  },
});

export const { showMoreTickets, sortTicketsByPrice, sortTicketsByDuration, setValueFilterTicket, switchFilterAll } =
  ticketsList.actions;

export default ticketsList.reducer;
