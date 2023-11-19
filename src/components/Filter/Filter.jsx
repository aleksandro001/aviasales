import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setValueFilterTicket, switchFilterAll } from '../../store/ticketsList';

import Styles from './Filter.module.scss';

const Filter = () => {
  const [checkedAll, setCheckedAll] = useState(true);
  const [checkedZero, setCheckedZero] = useState(true);
  const [checkedOne, setCheckedOne] = useState(true);
  const [checkedTwo, setCheckedTwo] = useState(true);
  const [checkedThree, setCheckedThree] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
     if (checkedZero && checkedOne && checkedTwo && checkedThree) {
      setCheckedAll(true);
    } else {
      setCheckedAll(false);
    }
  }, [checkedZero, checkedOne, checkedTwo, checkedThree]);

  useEffect(() => {
    dispatch(switchFilterAll(checkedAll));
  }, [dispatch, checkedAll]);

  useEffect(() => {
    dispatch(setValueFilterTicket({ isChecked: checkedZero, filterValue: 0 }));
  }, [checkedZero, dispatch]);

  useEffect(() => {
    dispatch(setValueFilterTicket({ isChecked: checkedOne, filterValue: 1 }));
  }, [checkedOne, dispatch]);

  useEffect(() => {
    dispatch(setValueFilterTicket({ isChecked: checkedTwo, filterValue: 2 }));
  }, [checkedTwo, dispatch]);

  useEffect(() => {
    dispatch(setValueFilterTicket({ isChecked: checkedThree, filterValue: 3 }));
  }, [checkedThree, dispatch]);

  const handleCheckboxChange = (event) => {
    switch (event.target.name) {
      case 'no_transfers':
        setCheckedZero(event.target.checked);
        break;
      case 'one_transfer':
        setCheckedOne(event.target.checked);
        break;
      case 'two_transfers':
        setCheckedTwo(event.target.checked);
        break;
      case 'three_transfers':
        setCheckedThree(event.target.checked);
        break;
      default:
        setCheckedAll(event.target.checked);
        setCheckedZero(event.target.checked);
        setCheckedOne(event.target.checked);
        setCheckedTwo(event.target.checked);
        setCheckedThree(event.target.checked);
    }
  };

  return (
    <div className={Styles.filter}>
      <div className={Styles.title}>КОЛИЧЕСТВО ПЕРЕСАДОК</div>
      <div className={Styles.wrapper}>
        <input
          type="checkbox"
          id="all"
          name="all"
          className={Styles.checkbox}
          checked={checkedAll}
          onChange={(event) => handleCheckboxChange(event)}
        />
        <label className={Styles.label} htmlFor="all">Все</label>
      </div>
      <div className={Styles.wrapper}>
        <input
          type="checkbox"
          id="no_transfers"
          name="no_transfers"
          className={Styles.checkbox}
          checked={checkedZero}
          onChange={(event) => handleCheckboxChange(event)}
        />
        <label className={Styles.label} htmlFor="no_transfers">Без пересадок</label>
      </div>
      <div className={Styles.wrapper}>
        <input
          type="checkbox"
          id="one_transfer"
          name="one_transfer"
          className={Styles.checkbox}
          checked={checkedOne}
          onChange={(event) => handleCheckboxChange(event)}
        />
        <label className={Styles.label} htmlFor="one_transfer">1 пересадка</label>
      </div>
      <div className={Styles.wrapper}>
        <input
          type="checkbox"
          id="two_transfers"
          name="two_transfers"
          className={Styles.checkbox}
          checked={checkedTwo}
          onChange={(event) => handleCheckboxChange(event)}
        />
        <label className={Styles.label} htmlFor="two_transfers">2 пересадки</label>
      </div>
      <div className={Styles.wrapper}>
        <input
          type="checkbox"
          id="three_transfers"
          name="three_transfers"
          className={Styles.checkbox}
          checked={checkedThree}
          onChange={(event) => handleCheckboxChange(event)}
        />
        <label className={Styles.label} htmlFor="three_transfers">3 пересадки</label>
      </div>
    </div>
  )
};

export default Filter;
