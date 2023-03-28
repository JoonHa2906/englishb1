import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { formatRelative, format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import NotFound from '~/components/NotFound';
import ListeningService from '~/services/listening.service';
import MatchimgvocaService from '~/services/matchimgvoca.service';
import ReadingService from '~/services/reading.service';
import TestingsService from '~/services/testing.service';
import UserService from '~/services/user.service';
import styles from './Profile.module.scss';

const cx = classNames.bind(styles);

function Profile() {
   const { email } = useParams();
   const [active, setActive] = useState('about');
   const [info, setInfo] = useState();
   const [reading, setReading] = useState();
   const [listening, setListening] = useState();
   const [testing, setTesting] = useState();
   const [game, setGame] = useState();
   const [loading, setLoading] = useState(true);
   function capitalizedStr(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
   }
   useEffect(() => {
      setLoading(true);
      (async (e) => {
         await UserService.getInfoByEmail(email)
            .then((response) => {
               setInfo(response.data);
            })
            .then(() => {
               setLoading(false);
            })
            .catch((err) => {
               console.log(err);
               setLoading(false);
            });
      })();
   }, [email]);
   useEffect(() => {
      if (info) {
         (async (e) => {
            await ReadingService.findAuthor(info.id)
               .then((response) => {
                  setReading(response.data);
               })
               .catch((err) => {
                  console.log(err);
               });
         })();
         (async (e) => {
            await ListeningService.findAuthor(info.id)
               .then((response) => {
                  setListening(response.data);
               })
               .catch((err) => {
                  console.log(err);
               });
         })();
         (async (e) => {
            await MatchimgvocaService.findAuthor(info.id)
               .then((response) => {
                  setGame(response.data);
               })
               .catch((err) => {
                  console.log(err);
               });
         })();
         (async (e) => {
            await TestingsService.findAuthor(info.id)
               .then((response) => {
                  setTesting(response.data);
               })
               .catch((err) => {
                  console.log(err);
               });
         })();
      }
   }, [info]);
   return (
      <div className={cx('content')}>
         {info ? (
            <div className={cx('card')} data-state="#about">
               <div className={cx('card-header')}>
                  <div
                     className={cx('card-cover')}
                     style={{
                        backgroundImage: `url('${info.picture}')`,
                     }}
                  ></div>
                  <img className={cx('card-avatar')} src={info.picture} alt="avatar" />
                  <h1 className={cx('card-fullname')}>{info.name}</h1>
               </div>
               <div className={cx('card-main')}>
                  <div className={cx('card-nav')}>
                     <div className={cx('card-buttons')}>
                        <button
                           className={cx(active === 'about' && 'is-active')}
                           onClick={() => setActive('about')}
                        >
                           ABOUT
                        </button>
                        <button
                           className={cx(active === 'post' && 'is-active')}
                           onClick={() => setActive('post')}
                        >
                           POST
                        </button>
                        <button
                           className={cx(active === 'contact' && 'is-active')}
                           onClick={() => setActive('contact')}
                        >
                           CONTACT
                        </button>
                     </div>
                  </div>
                  <div className={cx('card-section', active === 'about' && 'is-active')}>
                     <div className={cx('card-content')}>
                        <div className={cx('card-subtitle')}>ABOUT</div>
                        <p className={cx('card-desc')}>
                           Member of "English B1" since {format(new Date(info.createdAt), 'MM/dd/yyyy')}
                        </p>
                     </div>
                  </div>
                  <div className={cx('card-section', active === 'post' && 'is-active')}>
                     <div className={cx('card-content')}>
                        <div className={cx('card-subtitle')}>POST</div>
                        {reading &&
                           reading.length === 0 &&
                           listening &&
                           listening.length === 0 &&
                           testing &&
                           testing.length === 0 &&
                           game &&
                           game.length === 0 && <div className={cx('no-post')}>No post.</div>}
                        <div className={cx('card-timeline')}>
                           {reading && reading.length > 0 && (
                              <div className={cx('card-item')} data-type="Reading">
                                 {reading.map((item, index) => (
                                    <div key={index} className={cx('card-item-sub')}>
                                       <Link
                                          className={cx('card-item-title')}
                                          to={`/reading/${item.slug}`}
                                       >
                                          {item.title}
                                       </Link>
                                       <div className={cx('card-item-desc')}>
                                          {capitalizedStr(
                                             formatRelative(new Date(item.createdAt), new Date(), {
                                                locale: vi,
                                             }),
                                          )}
                                       </div>
                                    </div>
                                 ))}
                              </div>
                           )}
                           {listening && listening.length > 0 && (
                              <div className={cx('card-item')} data-type="Listening">
                                 {listening.map((item, index) => (
                                    <div key={index} className={cx('card-item-sub')}>
                                       <Link
                                          className={cx('card-item-title')}
                                          to={`/listening/${item.slug}`}
                                       >
                                          {item.title}
                                       </Link>
                                       <div className={cx('card-item-desc')}>
                                          {capitalizedStr(
                                             formatRelative(new Date(item.createdAt), new Date(), {
                                                locale: vi,
                                             }),
                                          )}
                                       </div>
                                    </div>
                                 ))}
                              </div>
                           )}
                           {testing && testing.length > 0 && (
                              <div className={cx('card-item')} data-type="Testing">
                                 {testing.map((item, index) => (
                                    <div key={index} className={cx('card-item-sub')}>
                                       <Link
                                          className={cx('card-item-title')}
                                          to={`/testing/${item.slug}`}
                                       >
                                          {item.title}
                                       </Link>
                                       <div className={cx('card-item-desc')}>
                                          {capitalizedStr(
                                             formatRelative(new Date(item.createdAt), new Date(), {
                                                locale: vi,
                                             }),
                                          )}
                                       </div>
                                    </div>
                                 ))}
                              </div>
                           )}
                           {game && game.length > 0 && (
                              <div className={cx('card-item')} data-type="Game">
                                 {game.map((item, index) => (
                                    <div key={index} className={cx('card-item-sub')}>
                                       <Link className={cx('card-item-title')} to={`/game/${item.slug}`}>
                                          {item.title}
                                       </Link>
                                       <div className={cx('card-item-desc')}>
                                          {capitalizedStr(
                                             formatRelative(new Date(item.createdAt), new Date(), {
                                                locale: vi,
                                             }),
                                          )}
                                       </div>
                                    </div>
                                 ))}
                              </div>
                           )}
                        </div>
                     </div>
                  </div>
                  <div className={cx('card-section', active === 'contact' && 'is-active')}>
                     <div className={cx('card-content')}>
                        <div className={cx('card-subtitle')}>CONTACT</div>
                        <div className={cx('card-contact-wrapper')}>
                           <div className={cx('card-contact')}>
                              <div className={cx('card-contact-icon')}>
                                 <FontAwesomeIcon icon={faEnvelope} className={cx('card-icon')} />
                              </div>
                              {email}
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         ) : (
            !loading && <NotFound />
         )}
      </div>
   );
}

export default Profile;
