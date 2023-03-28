import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
   return (
      <div>
         <Header />
         <div className={cx('body')}>
            <Sidebar />
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

export default DefaultLayout;
