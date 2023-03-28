import classNames from 'classnames/bind';
import styles from './NotFound.module.scss';

const cx = classNames.bind(styles);

function NotFound() {
   return (
      <div className={cx('not-found')}>
         <img
            className={cx('img-not-found')}
            src={'https://cdn.sforum.vn/sforum/wp-content/uploads/2021/09/404.2.png'}
            alt="Not Found"
         />
         <div>Sorry, we couldn't find anything.</div>
      </div>
   );
}
export default NotFound;
