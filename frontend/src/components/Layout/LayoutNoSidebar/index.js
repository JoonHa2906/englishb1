import classNames from 'classnames/bind';
import Footer from '../DefaultLayout/Footer';
import Header from '../DefaultLayout/Header';
import styles from './LayoutNoSidebar.module.scss';

const cx = classNames.bind(styles);

function LayoutNoSidebar({ children }) {
   return (
      <div>
         <Header />
         <div className={cx('body')}>
            <div className={cx('content')}>
               <div className={cx('container')}>
                  {children}
               </div>
               
            </div>
         </div>
         <Footer />
      </div>
   );
}

export default LayoutNoSidebar;
