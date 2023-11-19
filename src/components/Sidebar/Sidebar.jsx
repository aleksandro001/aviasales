import React from 'react';
import Filter from '../Filter';

import Styles from './Sidebar.module.scss';

const Sidebar = () => (
  <div className={Styles.sidebar}>
    <Filter />
  </div>
);

export default Sidebar;
