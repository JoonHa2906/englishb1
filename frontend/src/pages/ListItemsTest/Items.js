import classNames from 'classnames/bind';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './Items.module.scss';
import { format } from 'date-fns';
import StarRatting from '~/components/StarRatting';
import RattingService from '~/services/ratting.service';
import { useEffect, useState } from 'react';
import UserService from '~/services/user.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import CountdownTimer from './CountdownTimer';
import ResultsService from '~/services/result.service';
import Leaderboard from './leaderboard';
import { useCookies } from 'react-cookie';
import NotificationService from '~/services/notification.service';

const cx = classNames.bind(styles);

const Items = ({ title, slug, url, createdAt, author, timeStart, timeEnd }) => {
    const [ratting, setRatting] = useState();
    const [authorName, setAuthorName] = useState();
    const [timeOut, setTimeOut] = useState(true);
    const [timeBegin, setTimeBegin] = useState(true);
    const [top3, setTop3] = useState(null);
    const [count, setCount] = useState(0);
    const [registered, setRegistered] = useState(false);
    const [cookies, setCookie] = useCookies(['email', 'noti']);
    const history = useNavigate();
    const location = useLocation();
    useEffect(() => {
        (async (e) => {
            await RattingService.average('testing', slug)
                .then((response) => {
                    setRatting(response.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        })();
        (async (e) => {
            await ResultsService.top3(slug)
                .then((response) => {
                    setTop3(response.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        })();
        (async (e) => {
            await ResultsService.getCount(slug)
                .then((response) => {
                    setCount(response.data.count);
                })
                .catch((err) => {
                    console.log(err);
                });
        })();
    }, [slug, registered]);
    useEffect(() => {
        author &&
            (async (e) => {
                await UserService.getName(author)
                    .then((response) => {
                        setAuthorName(response.data.name);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })();
    }, [author]);
    useEffect(() => {
        cookies.email &&
            (async (e) => {
                await ResultsService.findEmail(cookies.email.email, slug)
                    .then((response) => {
                        setRegistered(response.data.success);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })();
    }, [slug, cookies.email]);

    const createRegister = () => {
        if (!cookies.email) history(`/login/${encodeURIComponent(location.pathname)}`);
        (async (e) => {
            await ResultsService.create(
                JSON.stringify({
                    email: cookies.email.email,
                    slug,
                }),
            )
                .then((response) => {
                    response.data.success && setRegistered(response.data.success);
                    response.data.success &&
                        (async () => {
                            NotificationService.create(
                                JSON.stringify({
                                    email: cookies.email.email,
                                    content: response.data.message,
                                    type: 'success',
                                    link: `/testing/${slug}`,
                                }),
                            )
                                .then((response) => {
                                    setCookie('noti', (pre) => pre + 1, {
                                        secure: true,
                                        sameSite: 'Strict',
                                        path: '/',
                                    });
                                })
                                .catch((err) => {});
                        })();
                })
                .catch((err) => {
                    console.log(err);
                });
        })();
    };
    const startTest = () => {
        if (!cookies.email) history(`/login/${encodeURIComponent(location.pathname)}`);
        else if (registered) history(`/testing/${slug}/${cookies.email.email}`);
        else if (!registered)
            (async () => {
                NotificationService.create(
                    JSON.stringify({
                        email: cookies.email.email,
                        content:
                            'Bạn chưa đăng kí tham gia cuộc thi. Xin hãy tìm cuộc thi khác đang mở đăng kí',
                        type: 'warning',
                    }),
                )
                    .then((response) => {
                        setCookie('noti', (pre) => pre + 1, {
                            secure: true,
                            sameSite: 'Strict',
                            path: '/',
                        });
                    })
                    .catch((err) => {});
            })();
    };
    return (
        <Link to={`/testing/${slug}`} className={cx('block')}>
            <div className={cx('card')}>
                <div className={cx('box')}>
                    <div className={cx('image')} style={{ backgroundImage: `url(${url})` }}></div>
                </div>
                <div className={cx('header')}>
                    <div className={cx('title')}>{title}</div>
                    <div className={cx('content')}>
                        {top3 ? (
                            top3.map((item, index) => (
                                <Leaderboard key={index} email={item.email} index={index} />
                            ))
                        ) : (
                            <>There are no registered members yet</>
                        )}
                    </div>
                    <div className={cx('info')}>
                        <div className={cx('author', 'info-item')}>
                            {authorName && <span>Author: {authorName}</span>}
                        </div>
                        <div className={cx('date', 'info-item')}>
                            <span>Public: {format(new Date(createdAt), 'MM/dd/yyyy')}</span>
                        </div>
                        {ratting && (
                            <div className={cx('ratting', 'info-item')}>
                                <StarRatting score={ratting.average} count={ratting.count} />
                            </div>
                        )}
                    </div>
                </div>
                <div className={cx('count-user')}>
                    <div className={cx('icon-user')}>
                        <FontAwesomeIcon icon={faUsers} />
                    </div>
                    <div className={cx('count')}>{count}</div>
                </div>
                <div className={cx('action')}>
                    <div className={cx('countdown')}>
                        {timeOut && <CountdownTimer targetDate={timeStart} setTimeOut={setTimeOut} />}
                        {!timeOut && timeBegin && (
                            <CountdownTimer targetDate={timeEnd} setTimeOut={setTimeBegin} />
                        )}
                    </div>
                    {timeOut ? (
                        <div
                            className={cx('button', registered ? 'registered' : 'register')}
                            onClick={() => {
                                !registered && createRegister();
                            }}
                        >
                            {registered ? 'RIGISTERED' : 'RIGISTER'}
                        </div>
                    ) : timeBegin ? (
                        <div
                            className={cx('button', 'start')}
                            onClick={startTest}
                            style={
                                registered
                                    ? {}
                                    : {
                                          backgroundColor: '#aaa',
                                          cursor: 'not-allowed',
                                          borderColor: '#999',
                                          color: '#444',
                                      }
                            }
                        >
                            {' '}
                            START{' '}
                        </div>
                    ) : (
                        <div className={cx('button', 'finish')}> FINISH </div>
                    )}

                    <div className={cx('count-user-sm')}>
                        <div className={cx('icon-user')}>
                            <FontAwesomeIcon icon={faUsers} />
                        </div>
                        <div className={cx('count')}>{count}</div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default Items;
