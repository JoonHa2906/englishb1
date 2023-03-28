import classNames from 'classnames/bind';
import styles from './Test.module.scss';
import { useLocation, useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import ResultsService from '~/services/result.service';
import CountdownTimerTest from '../ListItemsTest/CountdownTimerTest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompress, faExpand } from '@fortawesome/free-solid-svg-icons';
import Modal from '~/components/Modal';
import NotificationService from '~/services/notification.service';

const cx = classNames.bind(styles);

function Test() {
    const history = useNavigate();
    const location = useLocation();
    const [cookies, setCookie] = useCookies(['email', 'noti']);
    const passageRef = useRef();
    const [testing, setTesting] = useState(null);
    const [begin, setBegin] = useState(false);
    const [passage, setPassage] = useState(0);
    const [questionNumber, setQuestionNumber] = useState(0);
    const { slug } = useParams();
    const [timeWork, setTimeWork] = useState(true);
    const [timeOut, setTimeOut] = useState(null);
    const [zoomIn, setZoomIn] = useState(false);

    const [choice, setChoice] = useState();
    useEffect(() => {
        Promise.resolve()
            .then(() => {
                if (!cookies.email) history(`/login/${encodeURIComponent(location.pathname)}`);
            })
            .then(() => {
                (async (e) => {
                    await ResultsService.getExam(
                        JSON.stringify({
                            slug,
                            email: cookies.email.email,
                        }),
                    )
                        .then((response) => {
                            if (!response.data.question || response.data.timeComplete > -1)
                                history(`/testing/${slug}`);
                            setTesting(response.data);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                })();
            }); // eslint-disable-next-line
    }, [cookies, history, location, slug, begin]);
    useEffect(() => {
        if (testing) {
            const datesStart = new Date(testing.timeStart).getTime();
            const datesEnd = new Date(testing.timeEnd).getTime();
            const dates = new Date().getTime();
            if (!testing.timeBegin) {
                if (dates < datesStart || dates > datesEnd) history(`/testing/${slug}`);
                else {
                    setBegin(true);
                    (async (e) => {
                        await ResultsService.updateTimeBegin(
                            JSON.stringify({
                                slug,
                                email: cookies.email.email,
                                timeBegin: new Date().getTime(),
                            }),
                        )
                            .then((response) => {})
                            .catch((err) => {});
                    })();
                }
            } else {
                setTimeOut(new Date(testing.timeBegin).getTime() + testing.timeLimit * 1000 * 60);
                if (new Date(testing.timeBegin).getTime() + testing.timeLimit * 1000 * 60 < dates)
                    history(`/testing/${slug}`);
            }
        }
    }, [testing, history, slug, cookies.email, timeOut]);
    useEffect(() => {
        (async (e) => {
            await ResultsService.getChoice(
                JSON.stringify({
                    slug,
                    email: cookies.email.email,
                }),
            )
                .then((response) => {
                    if (response.data.choice && response.data.choice.length > 0)
                        setChoice(response.data.choice);
                })
                .catch((err) => {});
        })();
    }, [slug, cookies.email]);
    useEffect(() => {
        if (testing)
            (async (e) => {
                await ResultsService.updateChoice(
                    JSON.stringify({
                        slug,
                        email: cookies.email.email,
                        choice,
                    }),
                )
                    .then((response) => {})
                    .catch((err) => {});
            })();
    }, [testing, choice, slug, cookies.email]);
    const handleSubmit = () => {
        const dates = new Date().getTime();
        const dateBegin = new Date(testing.timeBegin).getTime();
        const timeComplete = dates - dateBegin;
        (async (e) => {
            await ResultsService.submit(
                JSON.stringify({
                    slug,
                    email: cookies.email.email,
                    timeComplete,
                    choice,
                }),
            )
                .then((response) => {
                    (async () => {
                        NotificationService.create(
                            JSON.stringify({
                                email: cookies.email.email,
                                content: 'Bạn vừa hoàn thành bài thi thử. Xem thêm thông tin tại đây',
                                type: 'info',
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
                    history(`/testing/${slug}`);
                })
                .catch((err) => {
                    history(`/testing/${slug}`);
                });
        })();
    };

    return (
        <div className={cx('content')}>
            <div className={cx('test-submit')}>
                <div className={cx('test-submit-header')}></div>
                <div className={cx('test-submit-body')}></div>
                <div className={cx('test-submit-footer')}></div>
            </div>
            {testing && testing.paragraph && testing.question && (
                <div className={cx('row')}>
                    <div className={cx('col-md-6 col-sm-12', 'paragraph')}>
                        <div className={cx('passage')} ref={passageRef}>
                            {testing.paragraph.map((item, index) => (
                                <div key={index} style={passage !== index ? { display: 'none' } : {}}>
                                    <div
                                        className={cx('body')}
                                        key={index}
                                        dangerouslySetInnerHTML={{ __html: item }}
                                    ></div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={cx('col-lg-6 col-md-6 col-sm-12', 'paragraph')}>
                        {!zoomIn && (
                            <div className={cx('question-test')}>
                                <div
                                    className={cx('zoom-in')}
                                    onClick={() => setZoomIn(true)}
                                    title="Hide Question"
                                >
                                    <FontAwesomeIcon icon={faCompress} className={cx('zoom-icon')} />
                                </div>
                                <div className={cx('header')}>
                                    <div className={cx('time')}>
                                        {timeOut && timeWork && (
                                            <CountdownTimerTest
                                                targetDate={timeOut}
                                                setTimeWork={setTimeWork}
                                            />
                                        )}
                                    </div>
                                    <Modal
                                        header={'confirmation'}
                                        body={'Are you sure you want to submit your Exam?'}
                                        submit={handleSubmit}
                                    />
                                </div>
                                <div className={cx('nav')}>
                                    <div className={cx('nav-passage')}>
                                        <div
                                            className={cx('nav-passage-item')}
                                            onClick={() => {
                                                setPassage(0);
                                                setQuestionNumber(0);
                                                window.scrollTo({
                                                    top: 0,
                                                    behavior: `smooth`,
                                                });
                                                passageRef.current.scrollTo({
                                                    top: 0,
                                                    behavior: `smooth`,
                                                });
                                            }}
                                            style={
                                                passage === 0
                                                    ? { color: '#fff', backgroundColor: '#00008b' }
                                                    : {}
                                            }
                                        >
                                            Passage 1
                                        </div>
                                        <div
                                            className={cx('nav-passage-item')}
                                            onClick={() => {
                                                setPassage(1);
                                                setQuestionNumber(10);
                                                window.scrollTo({
                                                    top: 0,
                                                    behavior: `smooth`,
                                                });
                                                passageRef.current.scrollTo({
                                                    top: 0,
                                                    behavior: `smooth`,
                                                });
                                            }}
                                            style={
                                                passage === 1
                                                    ? { color: '#fff', backgroundColor: '#00008b' }
                                                    : {}
                                            }
                                        >
                                            Passage 2
                                        </div>
                                        <div
                                            className={cx('nav-passage-item')}
                                            onClick={() => {
                                                setPassage(2);
                                                setQuestionNumber(20);
                                                window.scrollTo({
                                                    top: 0,
                                                    behavior: `smooth`,
                                                });
                                                passageRef.current.scrollTo({
                                                    top: 0,
                                                    behavior: `smooth`,
                                                });
                                            }}
                                            style={
                                                passage === 2
                                                    ? { color: '#fff', backgroundColor: '#00008b' }
                                                    : {}
                                            }
                                        >
                                            Passage 3
                                        </div>
                                        <div
                                            className={cx('nav-passage-item')}
                                            onClick={() => {
                                                setPassage(3);
                                                setQuestionNumber(30);
                                                window.scrollTo({
                                                    top: 0,
                                                    behavior: `smooth`,
                                                });
                                                passageRef.current.scrollTo({
                                                    top: 0,
                                                    behavior: `smooth`,
                                                });
                                            }}
                                            style={
                                                passage === 3
                                                    ? { color: '#fff', backgroundColor: '#00008b' }
                                                    : {}
                                            }
                                        >
                                            Passage 4
                                        </div>
                                    </div>
                                    <div className={cx('nav-questionNumber')}>
                                        <div
                                            className={cx('nav-group')}
                                            style={passage !== 0 ? { display: 'none' } : {}}
                                        >
                                            <div
                                                className={cx('nav-group-item')}
                                                onClick={() => setQuestionNumber(0)}
                                                style={
                                                    questionNumber === 0
                                                        ? { color: '#fff', backgroundColor: '#008b0c' }
                                                        : choice[0] === null
                                                        ? { backgroundColor: '#aaa' }
                                                        : {}
                                                }
                                            >
                                                1
                                            </div>
                                            <div
                                                className={cx('nav-group-item')}
                                                onClick={() => setQuestionNumber(1)}
                                                style={
                                                    questionNumber === 1
                                                        ? { color: '#fff', backgroundColor: '#008b0c' }
                                                        : choice[1] === null
                                                        ? { backgroundColor: '#aaa' }
                                                        : {}
                                                }
                                            >
                                                2
                                            </div>
                                            <div
                                                className={cx('nav-group-item')}
                                                onClick={() => setQuestionNumber(2)}
                                                style={
                                                    questionNumber === 2
                                                        ? { color: '#fff', backgroundColor: '#008b0c' }
                                                        : choice[2] === null
                                                        ? { backgroundColor: '#aaa' }
                                                        : {}
                                                }
                                            >
                                                3
                                            </div>
                                            <div
                                                className={cx('nav-group-item')}
                                                onClick={() => setQuestionNumber(3)}
                                                style={
                                                    questionNumber === 3
                                                        ? { color: '#fff', backgroundColor: '#008b0c' }
                                                        : choice[3] === null
                                                        ? { backgroundColor: '#aaa' }
                                                        : {}
                                                }
                                            >
                                                4
                                            </div>
                                            <div
                                                className={cx('nav-group-item')}
                                                onClick={() => setQuestionNumber(4)}
                                                style={
                                                    questionNumber === 4
                                                        ? { color: '#fff', backgroundColor: '#008b0c' }
                                                        : choice[4] === null
                                                        ? { backgroundColor: '#aaa' }
                                                        : {}
                                                }
                                            >
                                                5
                                            </div>
                                            <div
                                                className={cx('nav-group-item')}
                                                onClick={() => setQuestionNumber(5)}
                                                style={
                                                    questionNumber === 5
                                                        ? { color: '#fff', backgroundColor: '#008b0c' }
                                                        : choice[5] === null
                                                        ? { backgroundColor: '#aaa' }
                                                        : {}
                                                }
                                            >
                                                6
                                            </div>
                                            <div
                                                className={cx('nav-group-item')}
                                                onClick={() => setQuestionNumber(6)}
                                                style={
                                                    questionNumber === 6
                                                        ? { color: '#fff', backgroundColor: '#008b0c' }
                                                        : choice[6] === null
                                                        ? { backgroundColor: '#aaa' }
                                                        : {}
                                                }
                                            >
                                                7
                                            </div>
                                            <div
                                                className={cx('nav-group-item')}
                                                onClick={() => setQuestionNumber(7)}
                                                style={
                                                    questionNumber === 7
                                                        ? { color: '#fff', backgroundColor: '#008b0c' }
                                                        : choice[7] === null
                                                        ? { backgroundColor: '#aaa' }
                                                        : {}
                                                }
                                            >
                                                8
                                            </div>
                                            <div
                                                className={cx('nav-group-item')}
                                                onClick={() => setQuestionNumber(8)}
                                                style={
                                                    questionNumber === 8
                                                        ? { color: '#fff', backgroundColor: '#008b0c' }
                                                        : choice[8] === null
                                                        ? { backgroundColor: '#aaa' }
                                                        : {}
                                                }
                                            >
                                                9
                                            </div>
                                            <div
                                                className={cx('nav-group-item')}
                                                onClick={() => setQuestionNumber(9)}
                                                style={
                                                    questionNumber === 9
                                                        ? { color: '#fff', backgroundColor: '#008b0c' }
                                                        : choice[9] === null
                                                        ? { backgroundColor: '#aaa' }
                                                        : {}
                                                }
                                            >
                                                10
                                            </div>
                                        </div>
                                        <div
                                            className={cx('nav-group')}
                                            style={passage !== 1 ? { display: 'none' } : {}}
                                        >
                                            <div
                                                className={cx('nav-group-item')}
                                                onClick={() => setQuestionNumber(10)}
                                                style={
                                                    questionNumber === 10
                                                        ? { color: '#fff', backgroundColor: '#008b0c' }
                                                        : choice[10] === null
                                                        ? { backgroundColor: '#aaa' }
                                                        : {}
                                                }
                                            >
                                                11
                                            </div>
                                            <div
                                                className={cx('nav-group-item')}
                                                onClick={() => setQuestionNumber(11)}
                                                style={
                                                    questionNumber === 11
                                                        ? { color: '#fff', backgroundColor: '#008b0c' }
                                                        : choice[11] === null
                                                        ? { backgroundColor: '#aaa' }
                                                        : {}
                                                }
                                            >
                                                12
                                            </div>
                                            <div
                                                className={cx('nav-group-item')}
                                                onClick={() => setQuestionNumber(12)}
                                                style={
                                                    questionNumber === 12
                                                        ? { color: '#fff', backgroundColor: '#008b0c' }
                                                        : choice[12] === null
                                                        ? { backgroundColor: '#aaa' }
                                                        : {}
                                                }
                                            >
                                                13
                                            </div>
                                            <div
                                                className={cx('nav-group-item')}
                                                onClick={() => setQuestionNumber(13)}
                                                style={
                                                    questionNumber === 13
                                                        ? { color: '#fff', backgroundColor: '#008b0c' }
                                                        : choice[13] === null
                                                        ? { backgroundColor: '#aaa' }
                                                        : {}
                                                }
                                            >
                                                14
                                            </div>
                                            <div
                                                className={cx('nav-group-item')}
                                                onClick={() => setQuestionNumber(14)}
                                                style={
                                                    questionNumber === 14
                                                        ? { color: '#fff', backgroundColor: '#008b0c' }
                                                        : choice[14] === null
                                                        ? { backgroundColor: '#aaa' }
                                                        : {}
                                                }
                                            >
                                                15
                                            </div>
                                            <div
                                                className={cx('nav-group-item')}
                                                onClick={() => setQuestionNumber(15)}
                                                style={
                                                    questionNumber === 15
                                                        ? { color: '#fff', backgroundColor: '#008b0c' }
                                                        : choice[15] === null
                                                        ? { backgroundColor: '#aaa' }
                                                        : {}
                                                }
                                            >
                                                16
                                            </div>
                                            <div
                                                className={cx('nav-group-item')}
                                                onClick={() => setQuestionNumber(16)}
                                                style={
                                                    questionNumber === 16
                                                        ? { color: '#fff', backgroundColor: '#008b0c' }
                                                        : choice[16] === null
                                                        ? { backgroundColor: '#aaa' }
                                                        : {}
                                                }
                                            >
                                                17
                                            </div>
                                            <div
                                                className={cx('nav-group-item')}
                                                onClick={() => setQuestionNumber(17)}
                                                style={
                                                    questionNumber === 17
                                                        ? { color: '#fff', backgroundColor: '#008b0c' }
                                                        : choice[17] === null
                                                        ? { backgroundColor: '#aaa' }
                                                        : {}
                                                }
                                            >
                                                18
                                            </div>
                                            <div
                                                className={cx('nav-group-item')}
                                                onClick={() => setQuestionNumber(18)}
                                                style={
                                                    questionNumber === 18
                                                        ? { color: '#fff', backgroundColor: '#008b0c' }
                                                        : choice[18] === null
                                                        ? { backgroundColor: '#aaa' }
                                                        : {}
                                                }
                                            >
                                                19
                                            </div>
                                            <div
                                                className={cx('nav-group-item')}
                                                onClick={() => setQuestionNumber(19)}
                                                style={
                                                    questionNumber === 19
                                                        ? { color: '#fff', backgroundColor: '#008b0c' }
                                                        : choice[19] === null
                                                        ? { backgroundColor: '#aaa' }
                                                        : {}
                                                }
                                            >
                                                20
                                            </div>
                                        </div>
                                        <div
                                            className={cx('nav-group')}
                                            style={passage !== 2 ? { display: 'none' } : {}}
                                        >
                                            <div
                                                className={cx('nav-group-item')}
                                                onClick={() => setQuestionNumber(20)}
                                                style={
                                                    questionNumber === 20
                                                        ? { color: '#fff', backgroundColor: '#008b0c' }
                                                        : choice[20] === null
                                                        ? { backgroundColor: '#aaa' }
                                                        : {}
                                                }
                                            >
                                                21
                                            </div>
                                            <div
                                                className={cx('nav-group-item')}
                                                onClick={() => setQuestionNumber(21)}
                                                style={
                                                    questionNumber === 21
                                                        ? { color: '#fff', backgroundColor: '#008b0c' }
                                                        : choice[21] === null
                                                        ? { backgroundColor: '#aaa' }
                                                        : {}
                                                }
                                            >
                                                22
                                            </div>
                                            <div
                                                className={cx('nav-group-item')}
                                                onClick={() => setQuestionNumber(22)}
                                                style={
                                                    questionNumber === 22
                                                        ? { color: '#fff', backgroundColor: '#008b0c' }
                                                        : choice[22] === null
                                                        ? { backgroundColor: '#aaa' }
                                                        : {}
                                                }
                                            >
                                                23
                                            </div>
                                            <div
                                                className={cx('nav-group-item')}
                                                onClick={() => setQuestionNumber(23)}
                                                style={
                                                    questionNumber === 23
                                                        ? { color: '#fff', backgroundColor: '#008b0c' }
                                                        : choice[23] === null
                                                        ? { backgroundColor: '#aaa' }
                                                        : {}
                                                }
                                            >
                                                24
                                            </div>
                                            <div
                                                className={cx('nav-group-item')}
                                                onClick={() => setQuestionNumber(24)}
                                                style={
                                                    questionNumber === 24
                                                        ? { color: '#fff', backgroundColor: '#008b0c' }
                                                        : choice[24] === null
                                                        ? { backgroundColor: '#aaa' }
                                                        : {}
                                                }
                                            >
                                                25
                                            </div>
                                            <div
                                                className={cx('nav-group-item')}
                                                onClick={() => setQuestionNumber(25)}
                                                style={
                                                    questionNumber === 25
                                                        ? { color: '#fff', backgroundColor: '#008b0c' }
                                                        : choice[25] === null
                                                        ? { backgroundColor: '#aaa' }
                                                        : {}
                                                }
                                            >
                                                26
                                            </div>
                                            <div
                                                className={cx('nav-group-item')}
                                                onClick={() => setQuestionNumber(26)}
                                                style={
                                                    questionNumber === 26
                                                        ? { color: '#fff', backgroundColor: '#008b0c' }
                                                        : choice[26] === null
                                                        ? { backgroundColor: '#aaa' }
                                                        : {}
                                                }
                                            >
                                                27
                                            </div>
                                            <div
                                                className={cx('nav-group-item')}
                                                onClick={() => setQuestionNumber(27)}
                                                style={
                                                    questionNumber === 27
                                                        ? { color: '#fff', backgroundColor: '#008b0c' }
                                                        : choice[27] === null
                                                        ? { backgroundColor: '#aaa' }
                                                        : {}
                                                }
                                            >
                                                28
                                            </div>
                                            <div
                                                className={cx('nav-group-item')}
                                                onClick={() => setQuestionNumber(28)}
                                                style={
                                                    questionNumber === 28
                                                        ? { color: '#fff', backgroundColor: '#008b0c' }
                                                        : choice[28] === null
                                                        ? { backgroundColor: '#aaa' }
                                                        : {}
                                                }
                                            >
                                                29
                                            </div>
                                            <div
                                                className={cx('nav-group-item')}
                                                onClick={() => setQuestionNumber(29)}
                                                style={
                                                    questionNumber === 29
                                                        ? { color: '#fff', backgroundColor: '#008b0c' }
                                                        : choice[29] === null
                                                        ? { backgroundColor: '#aaa' }
                                                        : {}
                                                }
                                            >
                                                30
                                            </div>
                                        </div>
                                        <div
                                            className={cx('nav-group')}
                                            style={passage !== 3 ? { display: 'none' } : {}}
                                        >
                                            <div
                                                className={cx('nav-group-item')}
                                                onClick={() => setQuestionNumber(30)}
                                                style={
                                                    questionNumber === 30
                                                        ? { color: '#fff', backgroundColor: '#008b0c' }
                                                        : choice[30] === null
                                                        ? { backgroundColor: '#aaa' }
                                                        : {}
                                                }
                                            >
                                                31
                                            </div>
                                            <div
                                                className={cx('nav-group-item')}
                                                onClick={() => setQuestionNumber(31)}
                                                style={
                                                    questionNumber === 31
                                                        ? { color: '#fff', backgroundColor: '#008b0c' }
                                                        : choice[31] === null
                                                        ? { backgroundColor: '#aaa' }
                                                        : {}
                                                }
                                            >
                                                32
                                            </div>
                                            <div
                                                className={cx('nav-group-item')}
                                                onClick={() => setQuestionNumber(32)}
                                                style={
                                                    questionNumber === 32
                                                        ? { color: '#fff', backgroundColor: '#008b0c' }
                                                        : choice[32] === null
                                                        ? { backgroundColor: '#aaa' }
                                                        : {}
                                                }
                                            >
                                                33
                                            </div>
                                            <div
                                                className={cx('nav-group-item')}
                                                onClick={() => setQuestionNumber(33)}
                                                style={
                                                    questionNumber === 33
                                                        ? { color: '#fff', backgroundColor: '#008b0c' }
                                                        : choice[33] === null
                                                        ? { backgroundColor: '#aaa' }
                                                        : {}
                                                }
                                            >
                                                34
                                            </div>
                                            <div
                                                className={cx('nav-group-item')}
                                                onClick={() => setQuestionNumber(34)}
                                                style={
                                                    questionNumber === 34
                                                        ? { color: '#fff', backgroundColor: '#008b0c' }
                                                        : choice[34] === null
                                                        ? { backgroundColor: '#aaa' }
                                                        : {}
                                                }
                                            >
                                                35
                                            </div>
                                            <div
                                                className={cx('nav-group-item')}
                                                onClick={() => setQuestionNumber(35)}
                                                style={
                                                    questionNumber === 35
                                                        ? { color: '#fff', backgroundColor: '#008b0c' }
                                                        : choice[35] === null
                                                        ? { backgroundColor: '#aaa' }
                                                        : {}
                                                }
                                            >
                                                36
                                            </div>
                                            <div
                                                className={cx('nav-group-item')}
                                                onClick={() => setQuestionNumber(36)}
                                                style={
                                                    questionNumber === 36
                                                        ? { color: '#fff', backgroundColor: '#008b0c' }
                                                        : choice[36] === null
                                                        ? { backgroundColor: '#aaa' }
                                                        : {}
                                                }
                                            >
                                                37
                                            </div>
                                            <div
                                                className={cx('nav-group-item')}
                                                onClick={() => setQuestionNumber(37)}
                                                style={
                                                    questionNumber === 37
                                                        ? { color: '#fff', backgroundColor: '#008b0c' }
                                                        : choice[37] === null
                                                        ? { backgroundColor: '#aaa' }
                                                        : {}
                                                }
                                            >
                                                38
                                            </div>
                                            <div
                                                className={cx('nav-group-item')}
                                                onClick={() => setQuestionNumber(38)}
                                                style={
                                                    questionNumber === 38
                                                        ? { color: '#fff', backgroundColor: '#008b0c' }
                                                        : choice[38] === null
                                                        ? { backgroundColor: '#aaa' }
                                                        : {}
                                                }
                                            >
                                                39
                                            </div>
                                            <div
                                                className={cx('nav-group-item')}
                                                onClick={() => setQuestionNumber(39)}
                                                style={
                                                    questionNumber === 39
                                                        ? { color: '#fff', backgroundColor: '#008b0c' }
                                                        : choice[39] === null
                                                        ? { backgroundColor: '#aaa' }
                                                        : {}
                                                }
                                            >
                                                40
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('question')}>
                                    {testing.question.map((question, index) => (
                                        <div
                                            key={index}
                                            style={questionNumber !== index ? { display: 'none' } : {}}
                                        >
                                            <div className={cx('question-title')}>
                                                <div
                                                    className={cx('question-title-number')}
                                                >{`Question ${index + 1}:`}</div>
                                                <div
                                                    className={cx('question-title-content')}
                                                    dangerouslySetInnerHTML={{ __html: question.title }}
                                                ></div>
                                            </div>
                                            <div className={cx('answer')}>
                                                <div className={cx('option')}>
                                                    <input
                                                        className={cx('input')}
                                                        type="radio"
                                                        name={`input-${index}`}
                                                        value={question.answer[0]}
                                                        id={`input-${index}-0`}
                                                        checked={question.answer[0] === choice[index]}
                                                        onChange={() => {
                                                            const nextChoice = choice.map((c, i) => {
                                                                if (i === index)
                                                                    return question.answer[0];
                                                                else return c;
                                                            });
                                                            setChoice(nextChoice);
                                                        }}
                                                    />
                                                    <label
                                                        className={cx('label')}
                                                        htmlFor={`input-${index}-0`}
                                                    >
                                                        {question.answer[0]}
                                                    </label>
                                                </div>
                                                <div className={cx('option')}>
                                                    <input
                                                        className={cx('input')}
                                                        type="radio"
                                                        name={`input-${index}`}
                                                        value={question.answer[1]}
                                                        id={`input-${index}-1`}
                                                        checked={question.answer[1] === choice[index]}
                                                        onChange={() => {
                                                            const nextChoice = choice.map((c, i) => {
                                                                if (i === index)
                                                                    return question.answer[1];
                                                                else return c;
                                                            });
                                                            setChoice(nextChoice);
                                                        }}
                                                    />
                                                    <label
                                                        className={cx('label')}
                                                        htmlFor={`input-${index}-1`}
                                                    >
                                                        {question.answer[1]}
                                                    </label>
                                                </div>
                                                <div className={cx('option')}>
                                                    <input
                                                        className={cx('input')}
                                                        type="radio"
                                                        name={`input-${index}`}
                                                        value={question.answer[2]}
                                                        checked={question.answer[2] === choice[index]}
                                                        id={`input-${index}-2`}
                                                        onChange={() => {
                                                            const nextChoice = choice.map((c, i) => {
                                                                if (i === index)
                                                                    return question.answer[2];
                                                                else return c;
                                                            });
                                                            setChoice(nextChoice);
                                                        }}
                                                    />
                                                    <label
                                                        className={cx('label')}
                                                        htmlFor={`input-${index}-2`}
                                                    >
                                                        {question.answer[2]}
                                                    </label>
                                                </div>
                                                <div className={cx('option')}>
                                                    <input
                                                        className={cx('input')}
                                                        type="radio"
                                                        name={`input-${index}`}
                                                        value={question.answer[3]}
                                                        checked={question.answer[3] === choice[index]}
                                                        id={`input-${index}-3`}
                                                        onChange={() => {
                                                            const nextChoice = choice.map((c, i) => {
                                                                if (i === index)
                                                                    return question.answer[3];
                                                                else return c;
                                                            });
                                                            setChoice(nextChoice);
                                                        }}
                                                    />
                                                    <label
                                                        className={cx('label')}
                                                        htmlFor={`input-${index}-3`}
                                                    >
                                                        {question.answer[3]}
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
            {zoomIn && (
                <div className={cx('zoom-out')} title="Show Question" onClick={() => setZoomIn(false)}>
                    <FontAwesomeIcon icon={faExpand} className={cx('zoom-icon')} />
                </div>
            )}
        </div>
    );
}

export default Test;
