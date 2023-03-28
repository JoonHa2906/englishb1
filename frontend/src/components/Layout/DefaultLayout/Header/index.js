import classNames from 'classnames/bind';
import { Link, useLocation } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { useEffect, useState } from 'react';
import en from '~/asset/lang/en.png';
import vn from '~/asset/lang/vn.png';
import Search from '../Search';
import config from '~/config';
import styles from './Header.module.scss';
import { useCookies } from 'react-cookie';
import { googleLogout } from '@react-oauth/google';
import NavItem from '../NavItem';
import SearchSm from '../SearchSm';
import Notification from '../Notification';

const cx = classNames.bind(styles);
function Header() {
    const [lang, setLang] = useState(vn);
    const [changeLanguge, setChangeLanguge] = useState(false);
    const [visibleProfile, setVisibleProfile] = useState(false);
    const [picture, setPicture] = useState();
    const [cookies, , removeCookie] = useCookies(['email']);
    const location = useLocation();
    function removeVietnameseTones(str) {
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
        str = str.replace(/đ/g, 'd');
        // Some system encode vietnamese combining accent as individual utf-8 characters
        // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
        str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
        // Remove extra spaces
        // Bỏ các khoảng trắng liền nhau
        str = str.replace(/ + /g, '');
        str = str.trim();
        // Remove punctuations
        // Bỏ dấu câu, kí tự đặc biệt
        str = str.replace(
            /!|@|%|\^|\*|\(|\)|\+|=|<|>|\?|\/|,|\.|:|;|'|"|&|#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,

            '',
        );
        return str;
    }
    useEffect(() => {
        cookies.email && setPicture(cookies.email.picture);
    }, [cookies.email]);
    const onTop = () => {
        window.scrollTo({
            top: 0,
            behavior: `smooth`,
        });
    };
    return (
        <>
            <header className={cx('wrapper-lg')}>
                <div className={cx('content')}>
                    <div className={cx('header-logo')}>
                        <Link className={cx('header-logo')} to={config.routes.home}>
                            <img
                                className={cx('header-logo-icon')}
                                src={
                                    'https://firebasestorage.googleapis.com/v0/b/doantotnghiep-379304.appspot.com/o/logo%2FlogoBlack.png?alt=media&token=c59f6c37-904b-455c-925d-c9692cabb18d'
                                }
                                alt="logo"
                            />
                            <span className={cx('header-logo-title')}>Tiếng Anh B1</span>
                        </Link>
                    </div>

                    <Search width="420px" />

                    {/* Header Action */}
                    {!!cookies.email ? (
                        <div className={cx('header-action')}>
                            {/* Notification - THÔNG BÁO */}
                            <Notification size="lg" />

                            {/* Profile */}
                            <div>
                                <Tippy
                                    interactive
                                    placement="bottom-end"
                                    visible={visibleProfile}
                                    render={(attrs) => (
                                        <div className={cx('profile-menu')} tabIndex="-1" {...attrs}>
                                            <PopperWrapper>
                                                <div className={cx('profile-header')}>
                                                    <img
                                                        className={cx('profile-avatar')}
                                                        src={picture}
                                                        alt="title-img"
                                                    ></img>

                                                    <div className={cx('profile-name')}>
                                                        <div className={cx('profile-account-name')}>
                                                            {cookies.email.name}
                                                        </div>
                                                        <div className={cx('profile-account')}>
                                                            @
                                                            {removeVietnameseTones(
                                                                cookies.email.name
                                                                    .split(' ')
                                                                    .join('')
                                                                    .toLowerCase(),
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className="break"></span>
                                                <Link
                                                    to={`/profile/${cookies.email.email}`}
                                                    className={cx('profile-info')}
                                                    onClick={() => {
                                                        setVisibleProfile(false);
                                                        onTop();
                                                    }}
                                                >
                                                    Trang cá nhân
                                                </Link>
                                                <Link
                                                    to={config.routes.setting}
                                                    className={cx('profile-setting')}
                                                    onClick={() => {
                                                        setVisibleProfile(false);
                                                        onTop();
                                                    }}
                                                >
                                                    Cài đặt
                                                </Link>
                                                <span className="break"></span>
                                                <Link
                                                    to={`/login/${encodeURIComponent(
                                                        location.pathname,
                                                    )}`}
                                                    className={cx('profile-logOut')}
                                                    onClick={() => {
                                                        setVisibleProfile(false);
                                                        document.cookie.split(';').forEach(function (c) {
                                                            document.cookie = c
                                                                .replace(/^ +/, '')
                                                                .replace(
                                                                    /=.*/,
                                                                    '=;expires=' +
                                                                        new Date().toUTCString() +
                                                                        ';path=/',
                                                                );
                                                        });
                                                        googleLogout();
                                                        removeCookie('email', 'noti', {
                                                            secure: true,
                                                            sameSite: 'Strict',
                                                            path: '/',
                                                        });
                                                    }}
                                                >
                                                    Đăng xuất
                                                </Link>
                                            </PopperWrapper>
                                        </div>
                                    )}
                                    onClickOutside={() => setVisibleProfile(false)}
                                >
                                    <div
                                        className={cx('profile')}
                                        aria-expanded="false"
                                        onClick={() => {
                                            setVisibleProfile(!visibleProfile);
                                        }}
                                    >
                                        <img
                                            className={cx('avatar-btn')}
                                            src={picture}
                                            alt="title-img"
                                        ></img>
                                    </div>
                                </Tippy>
                            </div>
                            {/* HẾT PROFILE */}
                            <div>
                                <Tippy
                                    interactive
                                    visible={changeLanguge}
                                    placement="bottom-end"
                                    render={(attrs) => (
                                        <div className={cx('language-menu')} tabIndex="-1" {...attrs}>
                                            <div className={cx('language-choice')}>
                                                <div
                                                    className={cx('language-vn')}
                                                    onClick={() => {
                                                        setLang(vn);
                                                        setChangeLanguge(false);
                                                    }}
                                                >
                                                    <img
                                                        className={cx('language-img')}
                                                        src={vn}
                                                        alt="Vietnamese"
                                                    ></img>
                                                    <span className={cx('language-name')}>
                                                        Vietnamese
                                                    </span>
                                                </div>
                                                <div
                                                    className={cx('language-en')}
                                                    onClick={() => {
                                                        setLang(en);
                                                        setChangeLanguge(false);
                                                    }}
                                                >
                                                    <img
                                                        className={cx('language-img')}
                                                        src={en}
                                                        alt="English"
                                                    ></img>
                                                    <span className={cx('language-name')}>English</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    onClickOutside={() => setChangeLanguge(false)}
                                >
                                    <div
                                        className={cx('language')}
                                        aria-expanded="false"
                                        onClick={() => {
                                            setChangeLanguge(!changeLanguge);
                                        }}
                                    >
                                        <img
                                            className={cx('language-icon')}
                                            src={lang}
                                            alt="Ngôn ngữ"
                                        ></img>
                                    </div>
                                </Tippy>
                            </div>
                        </div>
                    ) : (
                        <div className={cx('header-action')}>
                            <Link
                                to={`/login/${encodeURIComponent(location.pathname)}`}
                                className={cx('header-action-login')}
                            >
                                Đăng nhập
                            </Link>
                        </div>
                    )}
                </div>
            </header>
            <header className={cx('wrapper-md')}>
                <NavItem title="logo" size="s" />
                <div className={cx('right')}>
                    <SearchSm width="200px" />
                    {!!cookies.email ? (
                        <div style={{ marginLeft: '6px' }} className={cx('user')}>
                            <Notification size="smDown" />
                            <NavItem title="plus-down" size="s" />
                        </div>
                    ) : (
                        <div style={{ marginLeft: '6px' }}>
                            <NavItem title="login" size="s" />
                        </div>
                    )}
                </div>
            </header>
        </>
    );
}

export default Header;
