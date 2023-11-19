/* eslint-disable react/prop-types,spaced-comment,arrow-body-style */
import React from 'react';

import enumeration from '../../utils/enumeration';
import { getArrivalTime, getDepartureTime, getTravelTime } from '../../utils/formatTime';

import Styles from './Ticket.module.scss';

const Ticket = ({ price, carrier, segments }) => (
  <div className={Styles.ticket}>
    <div className={Styles.price_logo}>
      <div className={Styles.price}>{price.toLocaleString()} Р</div>
      <img className={Styles.logo} alt="logo" src={`//pics.avs.io/99/36/${carrier}.png`} />
    </div>
    {segments.map((item) => (
      <div className={Styles.information} key={item.date}>
        <div className={`${Styles.text} ${Styles.gray_text}`}>
          {item.origin}-{item.destination}
        </div>
        <div className={`${Styles.text} ${Styles.gray_text}`}>В ПУТИ</div>
        <div className={`${Styles.text} ${Styles.gray_text}`}>
          {item.stops.length} {enumeration(item.stops.length)}
        </div>
        <div className={Styles.text}>
          {getDepartureTime(item.date)} - {getArrivalTime(item.date, item.duration)}
        </div>
        <div className={Styles.text}>{getTravelTime(item.duration)}</div>
        <div className={Styles.text}>{item.stops.join(', ')}</div>
      </div>
    ))}
  </div>
);

export default Ticket;
