import React from 'react';

import Styles from './ErrorMessage.module.scss';

const ErrorMsg = () => <div className={Styles.error_message}> Что-то пошло не так.. Попробуйте обновить страницу</div>;

export default ErrorMsg;
