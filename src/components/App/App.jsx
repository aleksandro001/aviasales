import React from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import Main from '../Main';

import Styles from './App.module.scss';

const App = () => (
  <div className={Styles.app}>
    <Header />
    <Sidebar />
    <Main />
  </div>
);

export default App;
