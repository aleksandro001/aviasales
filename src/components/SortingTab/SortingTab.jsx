import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import classNames from "classnames/bind";
import { sortTicketsByPrice, sortTicketsByDuration } from '../../store/ticketsList';

import Styles from './SortingTab.module.scss';

const SortingTab = () => {
  const dispatch = useDispatch();
  const [cheapSelect, setCheapSelect] = useState(false);
  const [fastSelect, setFastSelect] = useState(false);

  const cx = classNames.bind(Styles);

  return (
    <div className={Styles.tabs}>
      <div
        role="presentation"
        className={cx({
          tab: true,
          select: cheapSelect,
        })}
        onClick={() => {
          dispatch(sortTicketsByPrice());
          setCheapSelect(true);
          setFastSelect(false);
        }}
      >
        <span>САМЫЙ ДЕШЕВЫЙ</span>
      </div>
      <div
        role="presentation"
        className={cx({
          tab: true,
          select: fastSelect,
        })}
        onClick={() => {
          dispatch(sortTicketsByDuration());
          setCheapSelect(false);
          setFastSelect(true);
        }}
      >
        <span>САМЫЙ БЫСТРЫЙ</span>
      </div>
    </div>
  );
};

export default SortingTab;
