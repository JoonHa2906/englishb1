import classNames from 'classnames/bind';
import { Link, useParams } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import styles from './Login.module.scss';
import { useCookies } from 'react-cookie';

import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import UserService from '~/services/user.service';
import NotificationService from '~/services/notification.service';

const cx = classNames.bind(styles);

function Login() {
    function parseJwt(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join(''),
        );

        return JSON.parse(jsonPayload);
    }
    const emailRef = useRef();
    const history = useNavigate();
    const [cookies, setCookie] = useCookies(['email', 'noti']);
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [mess, setMess] = useState();
    const { page } = useParams();
    useEffect(() => {
        if (!!cookies.email) history(decodeURIComponent(page));
    }, [cookies, history, page]);
    const responseMessage = async (response) => {
        const str = JSON.stringify(parseJwt(response.credential));
        await UserService.createByGoogle(str)
            .then((data) => {
                setCookie('email', data.data, {
                    secure: true,
                    sameSite: 'Strict',
                    path: '/',
                });
            })
            .catch((err) => {
                console.log(err.message);
            });
    };
    const errorMessage = (error) => {
        console.log(error);
    };

    //Quên mật khẩu
    const forgotPassword = async (e) => {
        // eslint-disable-next-line
        const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!filter.test(email)) {
            setMess({
                success: false,
                message:
                    'Bạn chưa nhập Email hoặc Email không đúng định dạng. \nHãy nhập Email cần lấy lại mật khẩu!',
            });
            emailRef.current.focus();
            return;
        }

        e.preventDefault();
        await UserService.sendPassword(
            JSON.stringify({
                email: email,
            }),
        )
            .then((response) => {
                setMess(response.data);
                (async () => {
                    NotificationService.create(
                        JSON.stringify({
                            email: email,
                            content:
                                'Có phải bạn chọn quên mật khẩu? Hãy tăng cường bảo mật nếu đó không phải là bạn!',
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
            })
            .catch((err) => {
                setMess(err);
            });
    };

    //Đăng nhập
    const loginUser = async (e) => {
        e.preventDefault();
        await UserService.loginUser(
            JSON.stringify({
                email: email,
                pass: pass,
            }),
        )
            .then((response) => {
                setMess(response.data);
                if (response.data.success) {
                    setCookie('email', response.data, {
                        secure: true,
                        sameSite: 'Strict',
                        path: '/',
                    });
                }
            })
            .catch((err) => {
                setMess(err);
            });
    };
    if (!cookies.email)
        return (
            <div className={cx('login')}>
                <div className={cx('wrapper')}>
                    <div className={cx('title')}> Đăng nhập </div>
                    <form action="#" method="POST" onSubmit={loginUser}>
                        <div className={cx('field')}>
                            <input
                                ref={emailRef}
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email Address"
                                autoComplete="off"
                                spellCheck="false"
                                className={cx('input-box')}
                                required
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setMess();
                                }}
                            />
                            <label htmlFor="email">Email Address</label>
                        </div>
                        <div className={cx('field')}>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"
                                autoComplete="off"
                                className={cx('input-box')}
                                required
                                value={pass}
                                onChange={(e) => {
                                    setPass(e.target.value);
                                    setMess();
                                }}
                            />
                            <label htmlFor="password">Password</label>
                        </div>
                        <div className={cx('content')}>
                            <button className={cx('pass-link')} onClick={forgotPassword}>
                                Forgot password?
                            </button>
                        </div>
                        {mess ? (
                            <div
                                className={cx('message', mess.success ? 'success' : 'failed')}
                                dangerouslySetInnerHTML={{ __html: mess.message }}
                            ></div>
                        ) : (
                            <></>
                        )}
                        <div className={cx('field')}>
                            <input type="submit" value="Login" />
                        </div>
                        <div className={cx('signup-link')}>
                            <div className={cx('link-social')}>
                                <p>Or Signin/Signup Using</p>
                                <div className={cx('login-google')}>
                                    <GoogleLogin
                                        onSuccess={responseMessage}
                                        onError={errorMessage}
                                        className={cx('login-google-item')}
                                        theme="filled_blue"
                                        size="large"
                                        shape="pill"
                                        width="320px"
                                    />
                                </div>
                            </div>
                            <div>
                                <p>Or Signup Using Email</p>
                                <Link
                                    to={`/signup/${encodeURIComponent(page)}`}
                                    className={cx('link-signup')}
                                >
                                    SIGNUP
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
}

export default Login;
