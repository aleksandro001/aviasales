import React from 'react';

import TicketList from '../TicketList';
import SortingTab from '../SortingTab';

import Styles from './Main.module.scss';

const Main = () => (
  <div className={Styles.main}>
    <SortingTab />
    <TicketList />
  </div>
);

export default Main;
