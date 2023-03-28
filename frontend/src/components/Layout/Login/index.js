import classNames from 'classnames/bind';
import styles from './Login.module.scss';

const cx = classNames.bind(styles);

function Login({ children }) {
   return (
      <div>
         <div className={cx('container')}>
            <div className={cx('content')}>{children}</div>
         </div>
      </div>
   );
}

export default Login;
