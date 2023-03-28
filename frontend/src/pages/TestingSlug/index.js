import classNames from 'classnames/bind';
import styles from './TestingSlug.module.scss';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import logoBlack from '~/asset/logo/logoWhite.png';
import NotFound from '~/components/NotFound';
import TestingsService from '~/services/testing.service';
import { format } from 'date-fns';
import Reviews from '~/components/Reviews';
import { useCookies } from 'react-cookie';
import CountdownTimer from '../ListItemsTest/CountdownTimer';
import ResultsService from '~/services/result.service';
import Leaderboard from './leaderboard';
import NotificationService from '~/services/notification.service';

const cx = classNames.bind(styles);

function TestingSlug() {
    const [loading, setLoading] = useState(true);
    const [cookies, setCookie] = useCookies(['email', 'noti']);
    const [testing, setTesting] = useState();
    const [active, setActive] = useState('leaderboard');
    const { slug } = useParams();
    const [timeOut, setTimeOut] = useState(true);
    const [timeBegin, setTimeBegin] = useState(true);
    const [registered, setRegistered] = useState(false);
    const [result, setResult] = useState(null);
    const [complete, setComplete] = useState(false);
    const history = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setLoading(true);
        Promise.resolve()
            .then(() => {
                (async (e) => {
                    await TestingsService.findSlug(slug)
                        .then((response) => {
                            setTesting(response.data);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                })();
            })
            .then(() => {
                (async (e) => {
                    await ResultsService.findAll(slug)
                        .then((response) => {
                            setResult(response.data);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                })();
            })
            .then(() => {
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, [slug, registered]);
    useEffect(() => {
        (async (e) => {
            await ResultsService.findEmail(cookies.email.email, slug)
                .then((response) => {
                    setRegistered(response.data.success);
                    setComplete(response.data.timeComplete > -1);
                })
                .catch((err) => {
                    console.log(err);
                });
        })();
    }, [slug, cookies.email]);
    const createRegister = () => {
        if (!cookies.email) history(`/login/${encodeURIComponent(location.pathname)}`);
        const dates = new Date().getTime();
        const datesStart = new Date(testing.timeStart).getTime();
        if (datesStart < dates) {
            (async () => {
                NotificationService.create(
                    JSON.stringify({
                        email: cookies.email.email,
                        content:
                            'Đã hết thời gian đăng kí thi thử. Xin hãy tìm cuộc thi khác đang mở đăng kí',
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
        } else {
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
        }
    };
    const startTest = () => {
        if (complete) return;
        if (!cookies.email) history(`/login/${encodeURIComponent(location.pathname)}`);
        else if (registered && !complete) history(`/testing/${slug}/${cookies.email.email}`);
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
        <div className={cx('content')}>
            {testing ? (
                <div className={cx('card')} data-state="#leaderboard">
                    <div className={cx('card-header')}>
                        <div className={cx('header-logo')}>
                            <img src={logoBlack} alt="logo" className={cx('logo')} />
                        </div>
                        <div className={cx('header-info')}>
                            <h1 className={cx('card-title')}>{testing.title}</h1>
                            <div className={cx('card-time')}>
                                {format(new Date(testing.timeStart), 'HH:mm')} -{' '}
                                {format(new Date(testing.timeEnd), 'HH:mm dd/MM/yyyy')}
                            </div>
                            <div className={cx('card-action')}>
                                <div className={cx('countdown')}>
                                    {timeOut && (
                                        <CountdownTimer
                                            targetDate={testing.timeStart}
                                            setTimeOut={setTimeOut}
                                        />
                                    )}
                                    {!timeOut && timeBegin && (
                                        <CountdownTimer
                                            targetDate={testing.timeEnd}
                                            setTimeOut={setTimeBegin}
                                        />
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
                                            registered && !complete
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
                            </div>
                        </div>
                    </div>
                    <div className={cx('card-main')}>
                        <div className={cx('card-nav')}>
                            <div className={cx('card-buttons')}>
                                <button
                                    className={cx(active === 'leaderboard' && 'is-active')}
                                    onClick={() => setActive('leaderboard')}
                                >
                                    Leaderboard
                                </button>
                                <button
                                    className={cx(active === 'info' && 'is-active')}
                                    onClick={() => setActive('info')}
                                >
                                    Information
                                </button>
                                <button
                                    className={cx(active === 'reviews' && 'is-active')}
                                    onClick={() => setActive('reviews')}
                                >
                                    Reviews
                                </button>
                            </div>
                        </div>
                        <div className={cx('card-section', active === 'leaderboard' && 'is-active')}>
                            <div className={cx('card-content')}>
                                <div className={cx('card-subtitle')}>Leaderboard</div>
                                {result && result.length === 0 && (
                                    <>There are no registered members yet</>
                                )}
                                {result && result.length > 0 && cookies.email && (
                                    <div className={cx('card-rank')}>
                                        {result.findIndex(
                                            (element) => element.email === cookies.email.email,
                                        ) > -1 &&
                                            `Your Rank: ${
                                                result.findIndex(
                                                    (element) => element.email === cookies.email.email,
                                                ) + 1
                                            }`}
                                    </div>
                                )}
                                {result && result.length > 0 && (
                                    <table
                                        className={cx(
                                            'table',
                                            'table-striped',
                                            'table-light',
                                            'table-hover',
                                        )}
                                    >
                                        <thead>
                                            <tr>
                                                <th scope="col">Rank</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Points</th>
                                                <th scope="col">Time Complete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {result.map((item, index) => (
                                                <Leaderboard
                                                    key={index}
                                                    index={index}
                                                    score={item.score}
                                                    email={item.email}
                                                    timeComplete={item.timeComplete}
                                                />
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </div>
                        <div className={cx('card-section', active === 'info' && 'is-active')}>
                            <div className={cx('card-content')}>
                                <div className={cx('card-subtitle')}>Information</div>
                                <div className={cx('test-info')}>{testing.title}</div>
                                <div className={cx('test-info')}>
                                    Start time: {format(new Date(testing.timeStart), 'HH:mm')} -{' '}
                                    {format(new Date(testing.timeEnd), 'HH:mm dd/MM/yyyy')}
                                </div>
                                <div
                                    className={cx('test-info')}
                                    dangerouslySetInnerHTML={{ __html: testing.action }}
                                ></div>
                            </div>
                        </div>
                        <div className={cx('card-section', active === 'reviews' && 'is-active')}>
                            <div className={cx('card-content')}>
                                <div className={cx('card-subtitle')}>Reviews</div>
                                <div className={cx('row')}>
                                    <div className={cx('col-12', 'reviews')}>
                                        {cookies.email && cookies.email.email ? (
                                            <Reviews
                                                email={cookies.email.email}
                                                slug={slug}
                                                type={'testing'}
                                            />
                                        ) : (
                                            <Reviews slug={slug} type={'testing'} />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                !loading && <NotFound />
            )}
        </div>
    );
}

export default TestingSlug;
