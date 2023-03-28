import React from 'react';
import { useCountdown } from '~/hooks/useCountdown';
import DateTimeDisplay from './DateTimeDisplay';
import classNames from 'classnames/bind';
import styles from './Items.module.scss';
const cx = classNames.bind(styles);

const ExpiredNotice = () => {
    return (
        <div className={cx('expired-notice')}>
            <span>TIMEOUT!!!</span>
        </div>
    );
};

const ShowCounter = ({ days, hours, minutes, seconds }) => {
    return (
        <div className={cx('show-counter')}>
            <DateTimeDisplay value={days} type={'Days'} isDanger={false} />
            <p>:</p>
            <DateTimeDisplay value={hours} type={'Hours'} isDanger={false} />
            <p>:</p>
            <DateTimeDisplay value={minutes} type={'Mins'} isDanger={false} />
            <p>:</p>
            <DateTimeDisplay value={seconds} type={'Seconds'} isDanger={false} />
        </div>
    );
};

const CountdownTimer = ({ targetDate, setTimeOut }) => {
    const [days, hours, minutes, seconds] = useCountdown(targetDate);

    if (days + hours + minutes + seconds <= 0) {
        setTimeOut(false);
        return <ExpiredNotice />;
    } else {
        return <ShowCounter days={days} hours={hours} minutes={minutes} seconds={seconds} />;
    }
};

export default CountdownTimer;
