import classNames from 'classnames/bind';
import styles from './StarRatting.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

function StarRatting({score, noNote = false, count = 0}) {
    if (noNote)
        return (
            <div className={cx("content-none")}>
                <FontAwesomeIcon icon = {faStar} style={{color: "#ffb40b"}}/>
                <FontAwesomeIcon icon = {faStar} style={score > 1 ? {color: "#ffb40b"} : {color: "#888"}}/>
                <FontAwesomeIcon icon = {faStar} style={score > 2 ? {color: "#ffb40b"} : {color: "#888"}}/>
                <FontAwesomeIcon icon = {faStar} style={score > 3 ? {color: "#ffb40b"} : {color: "#888"}}/>
                <FontAwesomeIcon icon = {faStar} style={score > 4 ? {color: "#ffb40b"} : {color: "#888"}}/>
            </div>
        )
    return (
        <div className={cx("content")}>
            <FontAwesomeIcon icon = {faStar} style={{color: "#ffb40b"}}/>
            <FontAwesomeIcon icon = {score <= 1 ? faStar : score < 2 ? faStarHalfStroke : faStar} style={score > 1 ? {color: "#ffb40b"} : {color: "#888"}}/>
            <FontAwesomeIcon icon = {score <= 2 ? faStar : score < 3 ? faStarHalfStroke : faStar} style={score > 2 ? {color: "#ffb40b"} : {color: "#888"}}/>
            <FontAwesomeIcon icon = {score <= 3 ? faStar : score < 4 ? faStarHalfStroke : faStar} style={score > 3 ? {color: "#ffb40b"} : {color: "#888"}}/>
            <FontAwesomeIcon icon = {score <= 4 ? faStar : score < 5 ? faStarHalfStroke : faStar} style={score > 4 ? {color: "#ffb40b"} : {color: "#888"}}/>
            <span className={cx("reviews")}>
                {count !== 0 ? 
                    score : 
                    `No reviews.`
                }
            </span>
        </div>
    )
}

export default StarRatting;
