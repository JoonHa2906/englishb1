import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import styles from './NavItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import config from '~/config';
import { useCookies } from 'react-cookie';
import {
    faBars,
    faBook,
    faCheckSquare,
    faChevronLeft,
    faEarListen,
    faGamepad,
    faGear,
    faHome,
    faLanguage,
    faRightFromBracket,
    faRightToBracket,
    faSearch,
} from '@fortawesome/free-solid-svg-icons';

import Search from '../Search';
import { NavItemBox } from './NavItemBox';
import { useState } from 'react';
import { googleLogout } from '@react-oauth/google';

const cx = classNames.bind(styles);

function NavItem({ title, size = '-s', number = 0 }) {
    const [cookies, , removeCookie] = useCookies(['email']);
    const tit = title.toLowerCase();
    const history = useNavigate();
    const onTop = () => {
        window.scrollTo({
            top: 0,
            behavior: `smooth`,
        });
    };
    const [search, setSearch] = useState(false);
    const [plusDown, setPlusDown] = useState(false);
    const [plusUp, setPlusUp] = useState(false);

    const location = useLocation();

    switch (tit) {
        case 'logo':
            return (
                <nav className={cx(`nav-${size}`)}>
                    <Link
                        className={cx('sidebar-item')}
                        to={config.routes.home}
                        onClick={() => {
                            onTop();
                        }}
                    >
                        <img
                            src={
                                'https://firebasestorage.googleapis.com/v0/b/doantotnghiep-379304.appspot.com/o/logo%2FlogoBlack.png?alt=media&token=c59f6c37-904b-455c-925d-c9692cabb18d'
                            }
                            className={cx('logo')}
                            alt="Home"
                        />
                    </Link>
                </nav>
            );
        case 'home':
            return (
                <nav className={cx(`nav-${size}`)}>
                    <NavLink
                        className={(nav) => cx('sidebar-item', { active: nav.isActive })}
                        to={config.routes.home}
                        onClick={() => {
                            onTop();
                        }}
                    >
                        <FontAwesomeIcon icon={faHome} className={cx('sidebar-item-icon')} />
                        <span className={cx('sidebar-item-title')}>Home</span>
                    </NavLink>
                </nav>
            );
        case 'reading':
            return (
                <nav className={cx(`nav-${size}`)}>
                    <NavLink
                        className={(nav) => cx('sidebar-item', { active: nav.isActive })}
                        to={config.routes.reading}
                        onClick={() => {
                            onTop();
                        }}
                    >
                        <FontAwesomeIcon icon={faBook} className={cx('sidebar-item-icon')} />
                        <span className={cx('sidebar-item-title')}>Reading</span>
                    </NavLink>
                </nav>
            );
        case 'listening':
            return (
                <nav className={cx(`nav-${size}`)}>
                    <NavLink
                        className={(nav) => cx('sidebar-item', { active: nav.isActive })}
                        to={config.routes.listening}
                        onClick={() => {
                            onTop();
                        }}
                    >
                        <FontAwesomeIcon icon={faEarListen} className={cx('sidebar-item-icon')} />
                        <span className={cx('sidebar-item-title')}>Listening</span>
                    </NavLink>
                </nav>
            );
        case 'dictionary':
            return (
                <nav className={cx(`nav-${size}`)}>
                    <NavLink
                        className={(nav) => cx('sidebar-item', { active: nav.isActive })}
                        to={config.routes.dictionary}
                        onClick={() => {
                            onTop();
                        }}
                    >
                        <FontAwesomeIcon icon={faLanguage} className={cx('sidebar-item-icon')} />
                        <span className={cx('sidebar-item-title')}>Dictionary</span>
                    </NavLink>
                </nav>
            );
        case 'testing':
            return (
                <nav className={cx(`nav-${size}`)}>
                    <NavLink
                        className={(nav) => cx('sidebar-item', { active: nav.isActive })}
                        to={config.routes.testing}
                        onClick={() => {
                            onTop();
                        }}
                    >
                        <FontAwesomeIcon icon={faCheckSquare} className={cx('sidebar-item-icon')} />
                        <span className={cx('sidebar-item-title')}>Testing</span>
                    </NavLink>
                </nav>
            );
        case 'game':
            return (
                <nav className={cx(`nav-${size}`)}>
                    <NavLink
                        className={(nav) => cx('sidebar-item', { active: nav.isActive })}
                        to={config.routes.game}
                        onClick={() => {
                            onTop();
                        }}
                    >
                        <FontAwesomeIcon icon={faGamepad} className={cx('sidebar-item-icon')} />
                        <span className={cx('sidebar-item-title')}>Game</span>
                    </NavLink>
                </nav>
            );
        case 'back':
            return (
                <nav className={cx(`nav-${size}`)}>
                    <div
                        className={cx('sidebar-item')}
                        onClick={() => {
                            history(-1);
                            onTop();
                        }}
                    >
                        <FontAwesomeIcon icon={faChevronLeft} className={cx('sidebar-item-icon')} />
                        <span className={cx('sidebar-item-title')}>Back</span>
                    </div>
                </nav>
            );
        case 'profile':
            return (
                <nav className={cx(`nav-${size}`)}>
                    <NavLink
                        className={(nav) => cx('sidebar-item', { active: nav.isActive })}
                        to={`/profile/${cookies.email.email}`}
                        onClick={() => {
                            onTop();
                        }}
                    >
                        <img src={cookies.email.picture} alt="avatar" className={cx('img')} />
                        <span className={cx('sidebar-item-title')}>Profile</span>
                    </NavLink>
                </nav>
            );
        case 'login':
            return (
                <nav className={cx(`nav-${size}`)}>
                    <NavLink
                        className={(nav) => cx('sidebar-item', { active: nav.isActive })}
                        to={`/login/${encodeURIComponent(location.pathname)}`}
                        onClick={() => {
                            onTop();
                        }}
                    >
                        <FontAwesomeIcon icon={faRightToBracket} className={cx('sidebar-item-icon')} />
                        <span className={cx('sidebar-item-title')}>Login</span>
                    </NavLink>
                </nav>
            );
        case 'search':
            return (
                <nav className={cx(`nav-${size}`)}>
                    <div
                        className={cx('sidebar-item', 'fiction')}
                        onClick={() => {
                            setSearch(true);
                        }}
                    >
                        {search ? (
                            <div className={cx('fiction-item')}>
                                <FontAwesomeIcon icon={faSearch} className={cx('sidebar-item-icon')} />
                                <span className={cx('sidebar-item-title')}>Search</span>
                            </div>
                        ) : (
                            <></>
                        )}
                        <FontAwesomeIcon icon={faSearch} className={cx('sidebar-item-icon')} />
                        <span className={cx('sidebar-item-title')}>Search</span>
                    </div>
                    <NavItemBox
                        type="search"
                        show={search}
                        onClickOutside={() => {
                            setSearch(false);
                        }}
                    >
                        <h3 className={cx('title')}>Search</h3>
                        <div className={cx('inner')}>
                            <Search width="420px" />
                        </div>
                    </NavItemBox>
                </nav>
            );
        case 'plus-down':
            return (
                <nav className={cx(`nav-plus-${size}`)}>
                    <div
                        className={cx('sidebar-item', 'fiction')}
                        onClick={() => {
                            setPlusDown(true);
                        }}
                    >
                        {plusDown ? (
                            <div className={cx('fiction-item')}>
                                <FontAwesomeIcon icon={faBars} className={cx('sidebar-item-icon')} />
                            </div>
                        ) : (
                            <></>
                        )}
                        <FontAwesomeIcon icon={faBars} className={cx('sidebar-item-icon')} />
                    </div>
                    <NavItemBox
                        show={plusDown}
                        type="plus-down"
                        onClickOutside={() => {
                            setPlusDown(false);
                        }}
                    >
                        <Link
                            className={cx('link-item')}
                            to={`/profile/${cookies.email.email}`}
                            onClick={() => {
                                onTop();
                                setPlusDown(false);
                            }}
                        >
                            <img src={cookies.email.picture} alt="avatar" className={cx('img')} />
                            <span className={cx('title')}>Profile</span>
                        </Link>
                        <Link
                            className={cx('link-item')}
                            to={config.routes.setting}
                            onClick={() => {
                                onTop();
                                setPlusDown(false);
                            }}
                        >
                            <FontAwesomeIcon icon={faGear} className={cx('icon')} />
                            <span className={cx('title')}>Setting</span>
                        </Link>

                        <Link
                            className={cx('link-item')}
                            to={`/login/${encodeURIComponent(location.pathname)}`}
                            onClick={() => {
                                googleLogout();
                                removeCookie('email', 'noti', {
                                    secure: true,
                                    sameSite: 'Strict',
                                    path: '/',
                                });
                                setPlusDown(false);
                            }}
                        >
                            <FontAwesomeIcon icon={faRightFromBracket} className={cx('icon')} />
                            <span className={cx('title')}>Log Out</span>
                        </Link>
                    </NavItemBox>
                </nav>
            );
        case 'plus-up':
            return (
                <nav className={cx(`nav-plus-${size}`)}>
                    <div
                        className={cx('sidebar-item', 'fiction')}
                        onClick={() => {
                            setPlusUp(true);
                        }}
                    >
                        {plusUp ? (
                            <div className={cx('fiction-item')}>
                                <FontAwesomeIcon icon={faBars} className={cx('sidebar-item-icon')} />
                            </div>
                        ) : (
                            <></>
                        )}
                        <FontAwesomeIcon icon={faBars} className={cx('sidebar-item-icon')} />
                    </div>
                    <NavItemBox
                        show={plusUp}
                        type="plus-up"
                        onClickOutside={() => {
                            setPlusUp(false);
                        }}
                    >
                        <Link
                            className={cx('link-item')}
                            to={`/profile/${cookies.email.email}`}
                            onClick={() => {
                                onTop();
                                setPlusUp(false);
                            }}
                        >
                            <img src={cookies.email.picture} alt="avatar" className={cx('img')} />
                            <span className={cx('title')}>Profile</span>
                        </Link>
                        <Link
                            className={cx('link-item')}
                            to={config.routes.setting}
                            onClick={() => {
                                onTop();
                                setPlusUp(false);
                            }}
                        >
                            <FontAwesomeIcon icon={faGear} className={cx('icon')} />
                            <span className={cx('title')}>Setting</span>
                        </Link>
                        <Link
                            className={cx('link-item')}
                            to={`/login/${encodeURIComponent(location.pathname)}`}
                            onClick={() => {
                                googleLogout();
                                removeCookie('email', 'noti', {
                                    secure: true,
                                    sameSite: 'Strict',
                                    path: '/',
                                });
                                setPlusUp(false);
                            }}
                        >
                            <FontAwesomeIcon icon={faRightFromBracket} className={cx('icon')} />
                            <span className={cx('title')}>Log Out</span>
                        </Link>
                    </NavItemBox>
                </nav>
            );
        default:
            return <></>;
    }
}

NavItem.propTypes = {
    title: PropTypes.string,
    size: PropTypes.string, //size: s, m, l
};

export default NavItem;
