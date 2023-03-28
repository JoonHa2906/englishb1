import classNames from 'classnames/bind';
import { Link, useParams } from 'react-router-dom';
import styles from './Verification.module.scss';

const cx = classNames.bind(styles);

function Verification() {
   const {success, message} = useParams();
   return <div className={cx('wrapper', success==='1'?'success':'danger')}>
      <header className={cx('header')}>{success==='1'?"Xác thực tài khoản thành công":"Xác thực tài khoản thất bại"}</header>
      <div className={cx('content')}>{message ==='0'?"Tài khoản hoặc mã xác thực không đúng. Hoặc bạn đã xác thực tài khoản rồi!":
      message ==='1'?
      "Hãy đăng nhập tài khoản của bạn!"
      :"Error updating User with email!"}</div>
      
      <Link to={`/login/${encodeURIComponent("/")}`} className={cx("button")}><button className={cx("button64")}><span className={cx("text")}>Về trang Đăng nhập</span></button></Link>
   </div>;
}

export default Verification;
