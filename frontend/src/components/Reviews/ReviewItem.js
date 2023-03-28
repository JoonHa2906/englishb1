import classNames from 'classnames/bind';
import styles from './ReviewItem.module.scss';
import { formatRelative } from 'date-fns';
import { vi } from 'date-fns/locale';
import StarRatting from '../StarRatting';
import UserService from '~/services/user.service';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

function ReviewItem({email, score, comment="", createdAt}) {
    const [info, setInfo] = useState();
    useEffect(() => {
        email && (async (e) => {
              await UserService.getInfoByEmail(email)
              .then((response) => {
                setInfo(response.data);
              })
              .catch((err) => {
                  console.log(err);
              });
          })();
     }, [email]);
     function capitalizedStr(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
     }
     const onTop = () => {
        window.scrollTo({
        top: 0,
        behavior: `smooth`,
        });
    };
    return (
        <div className={cx("list-reviews")}>
            <img src={info && info.picture} alt="avatar" className={cx("avatar")}/>
            <div className={cx("content")}>
                <Link to={`/profile/${email}`} className={cx("name")} onClick={onTop}> {info && info.name} </Link>
                <StarRatting score={score} noNote={true}/>
                <div className={cx("date")}>
                    {capitalizedStr(formatRelative(new Date(createdAt), new Date(), { locale: vi }))}
                </div>
                <div className={cx("comment")}>{comment}
                </div>
            </div>
        </div>
    )
}
export default ReviewItem;
