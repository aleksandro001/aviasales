import React from 'react';

import Styles from './WarningMessage.module.scss';

const WarningMessage = () => (
    <div className={Styles.warning_message}>Рейсов, подходящих под заданные фильтры, не найдено</div>
);

export default WarningMessage;
