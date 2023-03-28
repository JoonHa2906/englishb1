import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Items.module.scss';
import { format } from 'date-fns'
import StarRatting from '~/components/StarRatting';
import RattingService from '~/services/ratting.service';
import { useEffect, useState } from 'react';
import UserService from '~/services/user.service';

const cx = classNames.bind(styles);


const Items = ({ title, slug, url, type, createdAt, author}) => {
    const [ratting, setRatting] = useState();
    const [authorName, setAuthorName] = useState();
    useEffect(() => {
        (async (e) => {
           await RattingService.average( type, slug ) 
           .then((response) => {
                setRatting(response.data) ;
           })
           .catch((err) => {
              console.log(err);
           });
        })() 
     },[type, slug])
     useEffect(() => {
        author &&
        (async (e) => {
           await UserService.getName( author ) 
           .then((response) => {
                setAuthorName(response.data.name) ;
           })
           .catch((err) => {
              console.log(err);
           });
        })() 
     },[author])
    return (
        <Link to={`/${type}/${slug}`} className={cx("block")}>
            <div className={cx("card")}>
                <div className={cx("header")}>
                    <div className={cx("box")}>
                        <div className={cx("image")} style={{backgroundImage: `url(${url})`}}>
                            <div className={cx("bg-color")}></div>
                            <div className={cx("button")}>{type === "game" ? "Play Game" : "Learn"}</div>
                        </div>
                        
                    </div>
                    <div className={cx("date")}>
                        <span>Public: {format(new Date(createdAt), 'MM/dd/yyyy')}</span>
                    </div>
                    <div className={cx("author")}>
                        {authorName && <span>Author: {authorName}</span>}
                    </div>
                    
                        {ratting && 
                            <div className={cx("ratting")}>
                                <StarRatting score = {ratting.average} count = {ratting.count}/>
                            </div>
                        }
                    
                </div>
                <div className={cx("title")}>{title}</div>
            </div>
        </Link>
    )
};

export default Items;
