import classNames from 'classnames/bind';
import { Link, useParams } from 'react-router-dom';
import styles from './SignUp.module.scss';
import { useCookies } from 'react-cookie';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import UserService from '~/services/user.service';

const cx = classNames.bind(styles);

function SignUp() {
   const history = useNavigate();
   const { page } = useParams();
   const [cookies] = useCookies(['email']);
   useEffect(() => {
      if (!!cookies.email) history(decodeURIComponent(page));
   }, [cookies, history, page]);
   const [email, setEmail] = useState('');
   const [pass, setPass] = useState('');
   const [name, setName] = useState('');

   const [mess, setMess] = useState();

   const createByEmail = async (e) => {
      e.preventDefault();
      await UserService.createByEmail(
         JSON.stringify({
            email: email,
            pass: pass,
            name: name,
         }),
      )
         .then((response) => setMess(response.data))
         .catch((err) => {
            setMess(err);
         });
   };

   if (!cookies.email)
      return (
         <div className={cx('signup')}>
            <div className={cx('wrapper')}>
               <div className={cx('title')}> Đăng kí </div>
               <form action="#" method="POST" onSubmit={createByEmail}>
                  <div className={cx('field')}>
                     <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email Address"
                        autoComplete="off"
                        spellCheck="false"
                        className={cx('input-box')}
                        required
                        value={email}
                        onChange={(e) => {
                           setEmail(e.target.value);
                           setMess();
                        }}
                     />
                     <label htmlFor="email">Email Address</label>
                  </div>
                  <div className={cx('field')}>
                     <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        autoComplete="off"
                        id="password"
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        minLength={8}
                        title="Mật khẩu phải có ít nhất một chữ số, một chữ cái in hoa, một chữ cái in thường và từ 8 kí tự trở lên"
                        className={cx('input-box')}
                        required
                        value={pass}
                        onChange={(e) => {
                           setPass(e.target.value);
                           setMess();
                        }}
                     />
                     <label htmlFor="password">Password</label>
                  </div>
                  <div className={cx('field')}>
                     <input
                        type="text"
                        name="name"
                        placeholder="Display Name"
                        autoComplete="off"
                        id="name"
                        spellCheck="false"
                        className={cx('input-box')}
                        required
                        value={name}
                        onChange={(e) => {
                           setName(e.target.value);
                           setMess();
                        }}
                     />
                     <label htmlFor="name">Display Name</label>
                  </div>
                  {mess ? (
                     <div
                        className={cx('message', mess.success ? 'success' : 'failed')}
                        dangerouslySetInnerHTML={{ __html: mess.message }}
                     ></div>
                  ) : (
                     <></>
                  )}
                  <div className={cx('field', 'signup-btn')}>
                     <input type="submit" value="SignUp" />
                  </div>
               </form>

               <div className={cx('login-link')}>
                  <p>Or Login</p>
                  <Link to={`/login/${encodeURIComponent(page)}`} className={cx('link-login')}>
                     LOGIN
                  </Link>
               </div>
            </div>
         </div>
      );
}

export default SignUp;
