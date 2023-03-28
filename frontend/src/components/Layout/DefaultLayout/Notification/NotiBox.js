import { useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Notification.module.scss';

const cx = classNames.bind(styles);

export function NotiBox(props, {children}) {
  const ref = useRef(null);
  const { onClickOutside } = props;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside && onClickOutside();
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [ onClickOutside ]);

    if(!props.show)
        return null;
    
    if (props.type==="plus-down") return (
      <div ref={ref} className={cx('plus-down')}>
          {props.children}
      </div>
    );
    if (props.type==="plus-up") return (
      <div ref={ref} className={cx('plus-up')}>
          {props.children}
      </div>
    );
}