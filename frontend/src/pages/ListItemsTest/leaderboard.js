import classNames from 'classnames/bind';
import styles from './Items.module.scss';
import { useEffect, useState } from 'react';
import UserService from '~/services/user.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRankingStar } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
const Leaderboard = ({ email, index }) => {
    const [info, setInfo] = useState(null);
    useEffect(() => {
        email &&
            (async (e) => {
                await UserService.findOne(email)
                    .then((response) => {
                        setInfo(response.data);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })();
    }, [email]);
    return (
        info && (
            <div className={cx('rank')}>
                <img
                    src={info.picture}
                    alt="avt"
                    className={cx('avt')}
                    onError={(e) => {
                        e.target.src =
                            'https://firebasestorage.googleapis.com/v0/b/doantotnghiep-379304.appspot.com/o/logo%2FlogoBlack.png?alt=media';
                    }}
                />
                <div className={cx('info-user')}>
                    <div className={cx('name-user')}>{info.name}</div>
                    <div
                        className={cx('rank-user', index === 0 ? 'one' : index === 1 ? 'two' : 'three')}
                    >
                        <FontAwesomeIcon icon={faRankingStar} /> <span>{index + 1}</span>
                    </div>
                </div>
            </div>
        )
    );
};
export default Leaderboard;
