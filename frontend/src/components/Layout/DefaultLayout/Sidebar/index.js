import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { useCookies } from 'react-cookie';
import NavItem from '../NavItem';
import Notification from '../Notification';

const cx = classNames.bind(styles);

function Sidebar() {
   const [cookies] = useCookies(['email']);
   return (
      <>
         <div className={cx('sidebar-lg')}>
            <NavItem title='Home' size='l'/>
            <NavItem title='Reading' size='l'/>
            <NavItem title='Listening' size='l'/>
            <NavItem title='Dictionary' size='l'/>
            <NavItem title='Testing' size='l'/>
            <NavItem title='Game' size='l'/>
         </div>
         
         <div className={cx('sidebar-md')}>

            <div className={cx('logo-icon')}>
               <NavItem title='logo' size='s'/>
            </div>
            <div className={cx('break')}> </div>
            
            <NavItem title='Home' size='s'/>
            <NavItem title='search' size='s'/>
            <NavItem title='Reading' size='s'/>
            <NavItem title='Listening' size='s'/>
            <NavItem title='Dictionary' size='s'/>
            <NavItem title='Testing' size='s'/>
            <NavItem title='Game' size='s'/>
            {!!cookies.email ? 
               (
                  <>
                     
                     <Notification size="smUp"/>
                     <div className={cx('break')}> </div>
                     <NavItem title='plus-up' size='s'/>
                  </>
               )
               :
               (
                  <>
                     <div className={cx('break')}> </div>
                     <NavItem title='login' size='s'/>
                  </>
               )
            }
         </div>
      </>
   );
}
export default Sidebar;
