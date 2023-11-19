import React from 'react';

import Logo from '../../assets/images/logo.png';
import Styles from './Header.module.scss';

const Header = () => (
  <div className={Styles.header}>
    <img alt="logo" src={Logo} />
  </div>
);

export default Header;
