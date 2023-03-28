import classNames from 'classnames/bind';
import styles from './Modal.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle, faXmark } from '@fortawesome/free-solid-svg-icons';
import { ModalBox } from './ModalBox';
import { useState } from 'react';
const cx = classNames.bind(styles);

function Modal({ header, body, submit }) {
    const [hide, setHide] = useState(false);
    return (
        <div className={cx('content')}>
            <div
                className={cx('submit')}
                onClick={() => {
                    setHide(true);
                }}
            >
                SUBMIT
            </div>
            <ModalBox
                show={hide}
                onClickOutside={() => {
                    setHide(false);
                }}
            >
                <div className={cx('header')}>
                    <div className={cx('header-title')}>{header}</div>
                    <div
                        className={cx('header-icon')}
                        onClick={() => {
                            setHide(false);
                        }}
                    >
                        <FontAwesomeIcon icon={faXmark} className={cx('icon')} />
                    </div>
                </div>
                <div className={cx('body')}>
                    <div className={cx('body-icon')}>
                        <FontAwesomeIcon icon={faQuestionCircle} className={cx('icon')} />
                    </div>
                    <div className={cx('body-title')}>{body}</div>
                </div>
                <div className={cx('footer')}>
                    <div className={cx('button', 'yes')} onClick={submit}>
                        YES
                    </div>
                    <div
                        className={cx('button', 'no')}
                        onClick={() => {
                            setHide(false);
                        }}
                    >
                        NO
                    </div>
                </div>
            </ModalBox>
        </div>
    );
}

export default Modal;
