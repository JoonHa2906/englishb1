
import classNames from 'classnames/bind';
import Footer from '../DefaultLayout/Footer';
import Header from '../DefaultLayout/Header';
import Sidebar from '../DefaultLayout/Sidebar';
import styles from './Profile.module.scss';

const cx = classNames.bind(styles);

function Profile({ children }) {
   return (
      <div>
         <Header/>
         <div className={cx('body')}>
            <Sidebar/>
            <div className={cx('content')}>
               <div className={cx('container')}>
                  {children}
               </div>
               
            </div>
         </div>
         <Footer/>
      </div>
   );
}

export default Profile;
