import classNames from 'classnames/bind';
import styles from './HeaderGoBack.module.scss';

import {
   faBars
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Bar} from './Bar';
import NavItem from '../DefaultLayout/NavItem';

const cx = classNames.bind(styles);

function HeaderGoBack() {
   const [bar, setBar] = useState(false);
   return (
         <header className={cx('wrapper')}>
               <div className={cx('nav')}>
                  <div 
                     className={cx('bar-item', bar? "active":"")}
                        onClick={() => {
                              setBar(true);
                        }
                     }
                     data-title= "Điều hướng"
                  >
                     {bar ? <div className={cx('fiction-item')}>
                        <FontAwesomeIcon
                              icon={faBars}
                              className={cx('bar-item-icon')}
                        />
                     </div>:<></>}
                     <FontAwesomeIcon
                        icon={faBars}
                        className={cx('bar-item-icon')}
                     />
                  </div>
                  <Bar show={bar} setBar={setBar} onClickOutside={() => {setBar(false)}}>
                     <NavItem title="back" size="s"/>
                     <NavItem title="logo" size="s"/>
                     <NavItem title="reading" size="s"/>
                     <NavItem title="listening" size="s"/>
                     <NavItem title="dictionary" size="s"/>
                     <NavItem title="testing" size="s"/>
                     <NavItem title="game" size="s"/>
                  </Bar>
               </div>
         </header>
   );
}

export default HeaderGoBack;
