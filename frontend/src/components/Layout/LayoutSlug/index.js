import classNames from 'classnames/bind';
import HeaderGoBack from '../HeaderGoBack';
import styles from './LayoutSlug.module.scss';

const cx = classNames.bind(styles);

function LayoutSlug({ children }) {
   return (
      <div>
         <HeaderGoBack />
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

export default LayoutSlug;
