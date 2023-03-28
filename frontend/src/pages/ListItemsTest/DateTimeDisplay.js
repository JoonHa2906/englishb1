import React from 'react';
import classNames from 'classnames/bind';
import styles from './Items.module.scss';
const cx = classNames.bind(styles);

const DateTimeDisplay = ({ value, type, isDanger }) => {
    return (
        <div className={isDanger ? cx('countdown', 'danger') : cx('countdown')}>
            <p>{value}</p>
            <span>{type}</span>
        </div>
    );
};

export default DateTimeDisplay;
