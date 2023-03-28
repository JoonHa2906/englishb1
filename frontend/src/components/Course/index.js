import classNames from 'classnames/bind';
import styles from './Course.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Course({ img, title, date, status }) {
   return (
      <Link className={cx('wrapper-course')} to="/learning">
         <img className={cx('img-course')} src={img} alt="title-img"></img>
         <div className={cx('info-course')}>
            <div className={cx('title-course')}>{title}</div>
            {date ? (
               <div className={cx('date-course')}>{date}</div>
            ) : (
               <div className={cx('date-course')}>Bạn chưa học khóa này</div>
            )}
            {status ? (
               <div className={cx('status-course')}>Tiếp tục học</div>
            ) : (
               <div className={cx('status-course')}>Bắt đầu học</div>
            )}
         </div>
      </Link>
   );
}

export default Course;
