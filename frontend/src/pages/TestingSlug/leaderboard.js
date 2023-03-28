import classNames from 'classnames/bind';
import styles from './TestingSlug.module.scss';
import { useEffect, useState } from 'react';
import UserService from '~/services/user.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRankingStar } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const cx = classNames.bind(styles);
const Leaderboard = ({ email, index, score, timeComplete }) => {
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
            <tr>
                <th scope="row">
                    <div
                        className={cx(
                            'rank-user',
                            index === 0
                                ? 'one'
                                : index === 1
                                ? 'two'
                                : index === 2
                                ? 'three'
                                : 'rank-default',
                        )}
                    >
                        <FontAwesomeIcon icon={faRankingStar} className={cx('rank-icon')} />
                        <span> {index + 1}</span>
                    </div>
                </th>
                <td>
                    <Link to={`/profile/${email}`} className={cx('rank')}>
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
                        </div>
                    </Link>
                </td>
                <td>{timeComplete > -1 ? score : '_'}</td>
                <td>{timeComplete > -1 ? format(new Date(timeComplete), 'mm:ss') : '_'}</td>
            </tr>
        )
    );
};
export default Leaderboard;
