import classNames from 'classnames/bind';
import styles from './Empty.module.scss';

const cx = classNames.bind(styles);

function Empty({ children }) {
   return (
      <div>
         <div className={cx('body')}>
            <div className={cx('content')}>
               <div className={cx('container')}>
                  {children}
               </div>
            </div>
         </div>
      </div>
   );
}

export default Empty;
