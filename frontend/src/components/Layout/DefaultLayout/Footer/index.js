import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import logoWhite from '~/asset/logo/logoWhite.png';
import {} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTiktok, faYoutube } from '@fortawesome/free-brands-svg-icons';
import NavItem from '../NavItem';
const cx = classNames.bind(styles);

function Footer() {
   return (
      <>
         <footer className={cx('wrapper-lg')}>
            <div className={cx('container')}>
               <div className={cx('row')}>
                  <div className={cx('col-xl-3', 'col-lg-4', 'col-md-6', 'col-sm-12')}>
                     <Link className={cx('title')} to="/">
                        <img className={cx('logo-icon')} src={logoWhite} alt="logo" />
                        Tiếng Anh B1
                     </Link>
                     <div className={cx('content')}>
                        Điện thoại:{' '}
                        <Link className={cx('link')} to="tel:03.4949.5560">
                           03.4949.5560
                        </Link>
                        <br />
                        Email:{' '}
                        <Link className={cx('link')} to="mailTo:hajunior9x@gmail.com">
                           hajunior9x@gmail.com
                        </Link>
                        <br />
                        Địa chỉ: Thôn An Hải Tây, Tam Quang, Núi Thành, Quảng Nam
                     </div>
                  </div>
                  <div className={cx('col-xl-2', 'col-md-6', 'col-lg-4', 'col-sm-12')}>
                     <div className={cx('title')}>Về chúng tôi</div>
                     <div className={cx('content')}>
                        <ul>
                           <li className={cx('item')}>
                              <Link className={cx('link')} to="/">
                                 Giới thiệu
                              </Link>
                           </li>
                           <li className={cx('item')}>
                              <Link className={cx('link')} to="/">
                                 Liên hệ
                              </Link>
                           </li>
                           <li className={cx('item')}>
                              <Link className={cx('link')} to="/">
                                 Điều khoản
                              </Link>
                           </li>
                           <li className={cx('item')}>
                              <Link className={cx('link')} to="/">
                                 Bảo mật
                              </Link>
                           </li>
                        </ul>
                     </div>
                  </div>
                  <div className={cx('col-xl-2', 'col-md-6', 'col-lg-4', 'col-sm-12')}>
                     <div className={cx('title')}>Sản phẩm</div>
                     <div className={cx('content')}>
                        <ul>
                           <li className={cx('item')}>
                              <a
                                 className={cx('link')}
                                 target="_blank"
                                 rel="noreferrer"
                                 href="https://luyenthithpt.000webhostapp.com/"
                              >
                                 Luyện thi Hóa học
                              </a>
                           </li>
                           <li className={cx('item')}>
                              <Link className={cx('link')} to="/">
                                 Luyện thi Tiếng Anh B1
                              </Link>
                           </li>
                        </ul>
                     </div>
                  </div>
                  <div className={cx('col-xl-2', 'col-md-6', 'col-lg-4', 'col-sm-12')}>
                     <div className={cx('title')}>Mạng xã hội</div>
                     <div className={cx('content')}>
                        <ul>
                           <li className={cx('item')}>
                              <a
                                 href="https://www.facebook.com/joonha.junha/"
                                 target="_blank"
                                 rel="noreferrer"
                                 className={cx('link', 'center')}
                              >
                                 <p className={cx('iconSocialP')}>
                                    <FontAwesomeIcon
                                       icon={faFacebook}
                                       className={cx('iconSocial')}
                                    />
                                 </p>
                                 <span> Facebook</span>
                              </a>
                           </li>
                           <li className={cx('item')}>
                              <a
                                 href="https://www.youtube.com/channel/UCRs5gahs0dfuShU5zmcv2nw"
                                 target="_blank"
                                 rel="noreferrer"
                                 className={cx('link', 'center')}
                              >
                                 <p className={cx('iconSocialP')}>
                                    <FontAwesomeIcon
                                       icon={faYoutube}
                                       className={cx('iconSocial')}
                                    />
                                 </p>
                                 <span> Youtube</span>
                              </a>
                           </li>
                           <li className={cx('item')}>
                              <a
                                 href="/"
                                 target="_blank"
                                 rel="noreferrer"
                                 className={cx('link', 'center')}
                              >
                                 <p className={cx('iconSocialP')}>
                                    <FontAwesomeIcon
                                       icon={faInstagram}
                                       className={cx('iconSocial')}
                                    />
                                 </p>
                                 <span> Instagram</span>
                              </a>
                           </li>
                           <li className={cx('item')}>
                              <a
                                 href="/"
                                 target="_blank"
                                 rel="noreferrer"
                                 className={cx('link', 'center')}
                              >
                                 <p className={cx('iconSocialP')}>
                                    <FontAwesomeIcon icon={faTiktok} className={cx('iconSocial')} />
                                 </p>
                                 <span> Tik Tok</span>
                              </a>
                           </li>
                        </ul>
                     </div>
                  </div>
                  <div className={cx('col-xl-3', 'col-md-6', 'col-lg-4', 'col-sm-12')}>
                     <div className={cx('title')}>Trường Đại học</div>
                     <div className={cx('content')}>
                        Đây là sản phẩm DEMO Khóa luận tốt nghiệp của:
                        <br />
                        Sinh viên: Ngô Thanh Hà
                        <br />
                        Lớp: DT19CTT01
                        <br />
                        Trường: Đại học Quảng Nam
                     </div>
                  </div>
               </div>
               <div className={cx('row', 'copyRight')}>
                  <div className={cx('col-sm-12')}>
                     © Copyright:
                     <Link className={cx('link')} to="/" alt="Joon Ha">
                        <span> Joon Ha</span>
                     </Link>
                  </div>
               </div>
            </div>
         </footer>
         <footer className={cx('wrapper-md')}>
            <NavItem title="home" size="s" />
            <NavItem title="reading" size="s" />
            <NavItem title="listening" size="s" />
            <NavItem title="dictionary" size="s" />
            <NavItem title="testing" size="s" />
            <NavItem title="game" size="s" />
         </footer>
      </>
   );
}

export default Footer;
