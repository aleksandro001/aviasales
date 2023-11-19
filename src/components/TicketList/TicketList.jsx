import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {getSearchIdFromApi, getTicketsFromApi, showMoreTickets} from '../../store/ticketsList';

import Ticket from '../Ticket';
import WarningMessage from "../WarningMessage";
import Preloader from "../Preloader/Preloader";
import ErrorMessage from "../ErrorMessage";

import filterTicketsByTransfer from '../../utils/filterTicketsByTransfer';
import getUniqueKey from "../../utils/getUniqueKey";

import Styles from './TicketList.module.scss';
import {deleteCookie} from "../../utils/cookies";

const TicketList = () => {
  const tickets = useSelector((state) => state.tickets.tickets);
  const valueFilterTransfer = useSelector((state) => state.tickets.valueFilterTransfer);
  const stopFetch = useSelector((state) => state.tickets.stopFetch);
  const searchId = useSelector((state) => state.tickets.searchId);
  const ticketsDisplayed = useSelector((state) => state.tickets.ticketsDisplayed);
  const showAllTickets = useSelector((state) => state.tickets.showAllTickets);
  const isLoaded = useSelector((state) => state.tickets.isLoaded);
  const error = useSelector((state) => state.tickets.error);
  const dispatch = useDispatch();

  const ticketsFilter = tickets.filter((item) => filterTicketsByTransfer(item, showAllTickets, valueFilterTransfer))

  useEffect(() => {
    dispatch(getSearchIdFromApi());

    return deleteCookie('searchId');
  }, [dispatch]);

  useEffect(() => {
    if (!stopFetch && searchId) {
      dispatch(getTicketsFromApi());
    }
  }, [dispatch, tickets, stopFetch, searchId]);

  return (
    <div className={Styles.ticket_list}>
      {!isLoaded && <Preloader />}
      {error && <ErrorMessage />}
      {ticketsFilter.length === 0 && !error && isLoaded && <WarningMessage />}
      {
        ticketsFilter.slice(0, ticketsDisplayed).map((ticket) => (
          <Ticket key={getUniqueKey()} {...ticket} />
        ))
      }
      {ticketsFilter.length > ticketsDisplayed && (
        <button type="button" className={Styles.button} onClick={() => dispatch(showMoreTickets())}>
          ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!
        </button>
      )}
    </div>
  );
};

export default TicketList;
