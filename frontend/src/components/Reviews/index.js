import classNames from 'classnames/bind';
import styles from './Reviews.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import RattingService from '~/services/ratting.service';
import { Link, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import ReviewItem from './ReviewItem';
import NotificationService from '~/services/notification.service';
const cx = classNames.bind(styles);

function Reviews({ email, slug, type }) {
    const [reviews, setReviews] = useState();
    const [rate, setRate] = useState(5);
    const location = useLocation();
    const [reviewed, setReviewed] = useState();
    const [submit, setSubmit] = useState(false);
    const [, setCookie] = useCookies(['noti']);
    const [comment, setComment] = useState('');
    const [hover, setHover] = useState(0);
    const [message, setMessage] = useState();
    useEffect(() => {
        slug &&
            (async (e) => {
                await RattingService.getAll(type, slug)
                    .then((response) => {
                        setReviews(response.data);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })();
    }, [slug, type, submit, message]);
    useEffect(() => {
        slug &&
            email &&
            (async (e) => {
                await RattingService.findCheck(type, slug, email)
                    .then((response) => {
                        setReviewed(response.data);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })();
    }, [slug, type, email]);
    function handleSubmit() {
        (async (e) => {
            await RattingService.create(
                JSON.stringify({
                    email,
                    slug,
                    type,
                    score: rate,
                    comment,
                }),
            )
                .then((response) => {
                    setMessage(response.data.message);
                    (async (e) => {
                        await NotificationService.create(
                            JSON.stringify({
                                email: email,
                                content:
                                    'Bạn vừa thêm Đánh giá cho bài viết thành công! Click để xem lại đánh giá!',
                                type: 'success',
                                link: `/${type}/${slug}`,
                            }),
                        )
                            .then(() => {
                                setCookie('noti', (pre) => pre + 1, {
                                    secure: true,
                                    sameSite: 'Strict',
                                    path: '/',
                                });
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    })();
                })
                .catch((err) => {
                    setMessage(err);
                });
        })();
        setSubmit(true);
    }
    return (
        reviews && (
            <div className={cx('rating')}>
                <div className={cx('rate')}>
                    <div className={cx('average')}>
                        <FontAwesomeIcon
                            icon={reviews.average < 1 ? faStarHalfStroke : faStar}
                            style={{ color: '#ffb40b' }}
                        />
                        <FontAwesomeIcon
                            icon={
                                reviews.average <= 1
                                    ? faStar
                                    : reviews.average < 2
                                    ? faStarHalfStroke
                                    : faStar
                            }
                            style={reviews.average > 1 ? { color: '#ffb40b' } : { color: '#888' }}
                        />
                        <FontAwesomeIcon
                            icon={
                                reviews.average <= 2
                                    ? faStar
                                    : reviews.average < 3
                                    ? faStarHalfStroke
                                    : faStar
                            }
                            style={reviews.average > 2 ? { color: '#ffb40b' } : { color: '#888' }}
                        />
                        <FontAwesomeIcon
                            icon={
                                reviews.average <= 3
                                    ? faStar
                                    : reviews.average < 4
                                    ? faStarHalfStroke
                                    : faStar
                            }
                            style={reviews.average > 3 ? { color: '#ffb40b' } : { color: '#888' }}
                        />
                        <FontAwesomeIcon
                            icon={
                                reviews.average <= 4
                                    ? faStar
                                    : reviews.average < 5
                                    ? faStarHalfStroke
                                    : faStar
                            }
                            style={reviews.average > 4 ? { color: '#ffb40b' } : { color: '#888' }}
                        />
                    </div>
                    <span className={cx('your-review-title')}>
                        {reviews.data.length > 0
                            ? `${reviews.average} average based on ${reviews.data.length}  reviews.`
                            : `No reviews.`}
                    </span>
                </div>
                <div className={cx('your-review')}>
                    {!email ? (
                        <div className={cx('your-review-title')}>
                            <div>
                                Please{' '}
                                <span className={cx('login')}>
                                    <Link to={`/login/${encodeURIComponent(location.pathname)}`}>
                                        LOGIN
                                    </Link>
                                </span>{' '}
                                to rate this post!
                            </div>
                        </div>
                    ) : reviewed && reviewed.ratting ? (
                        <div className={cx('your-review-title')}>
                            <div>You have already rated this post.</div>
                        </div>
                    ) : reviews.data.length > 0 ? (
                        <div className={cx('your-review-title')}>You have not rated this post yet.</div>
                    ) : (
                        <div className={cx('your-review-title')}>
                            This post hasn't been rated yet. Be the first to rate this post!
                        </div>
                    )}
                    {message && (
                        <div className={cx('your-review-title')} style={{ color: '#2a2' }}>
                            Add review success.
                        </div>
                    )}
                    {reviewed && !reviewed.ratting && !submit && (
                        <div className={cx('your-rate')}>
                            <div className={cx('your-rate-title')}>ADD YOUR REVIEW</div>
                            <div>
                                <div className={cx('your-score')}>
                                    <span className={cx('title-item')}>Your rate:</span>
                                    <div className={cx('your-rate-icon')}>
                                        <FontAwesomeIcon
                                            icon={faStar}
                                            className={cx('active', hover > 0 && 'hover')}
                                            onClick={() => setRate(1)}
                                            onMouseOut={() => {
                                                setHover(0);
                                            }}
                                            onMouseOver={() => setHover(1)}
                                        />
                                        <FontAwesomeIcon
                                            icon={faStar}
                                            className={cx(rate > 1 && 'active', hover > 1 && 'hover')}
                                            onClick={() => setRate(2)}
                                            onMouseOut={() => {
                                                setHover(0);
                                            }}
                                            onMouseOver={() => setHover(2)}
                                        />
                                        <FontAwesomeIcon
                                            icon={faStar}
                                            className={cx(rate > 2 && 'active', hover > 2 && 'hover')}
                                            onClick={() => setRate(3)}
                                            onMouseOut={() => {
                                                setHover(0);
                                            }}
                                            onMouseOver={() => setHover(3)}
                                        />
                                        <FontAwesomeIcon
                                            icon={faStar}
                                            className={cx(rate > 3 && 'active', hover > 3 && 'hover')}
                                            onClick={() => setRate(4)}
                                            onMouseOut={() => {
                                                setHover(0);
                                            }}
                                            onMouseOver={() => setHover(4)}
                                        />
                                        <FontAwesomeIcon
                                            icon={faStar}
                                            className={cx(rate > 4 && 'active', hover > 4 && 'hover')}
                                            onClick={() => setRate(5)}
                                            onMouseOut={() => {
                                                setHover(0);
                                            }}
                                            onMouseOver={() => setHover(5)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <span className={cx('title-item')}>Your comment:</span>
                                <textarea
                                    spellCheck="false"
                                    rows={2}
                                    placeholder="Your comment..."
                                    className={cx('area-comment')}
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                ></textarea>
                            </div>
                            <div className={cx('submit')}>
                                <div onClick={handleSubmit} className={cx('btn-submit')}>
                                    Submit
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                {reviews && reviews.data && reviews.data.length > 0 && (
                    <div className={cx('list-reviews')}>
                        <div className={cx('list-reviews-title')}>REVIEWS</div>
                        {reviews.data.map((item, index) => (
                            <ReviewItem
                                key={index}
                                email={item.email}
                                score={item.score}
                                comment={item.comment}
                                createdAt={item.createdAt}
                            />
                        ))}
                    </div>
                )}
            </div>
        )
    );
}
export default Reviews;
