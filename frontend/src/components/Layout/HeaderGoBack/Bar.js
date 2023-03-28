import { useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './HeaderGoBack.module.scss';
const cx = classNames.bind(styles);

export function Bar(props) {

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

  return (
    <div ref={ref} className={cx('plus')}>
      {props.children}
    </div>
  );
}