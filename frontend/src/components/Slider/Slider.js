import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Slider.module.scss';
const cx = classNames.bind(styles);
function Slide2({ sliders }) {
   const delay = 8000;
   const [isHover, setIsHover] = useState(false);
   const [index, setIndex] = useState(0);
   const timeoutRef = useRef(null);
   function resetTimeout() {
      if (timeoutRef.current) {
         clearTimeout(timeoutRef.current);
      }
   }
   const gradien = [
      {left: "rgb(254, 33, 94)", right: "rgb(255, 148, 2)",},
      {left: "rgb(40, 119, 250)", right: "rgb(103, 23, 205)",},
      {left: "#dd3e54", right: "#6be585",},
      {left: "#8e2de2", right: "#4a00e0",},
      {left: "#b92b27", right: "#1565c0",},
      {left: "#00f260", right: "#0575e6",},
      {left: "#ee0979", right: "#ff6a00",},
      {left: "#a80077", right: "#66ff00",},
      {left: "#f7ff00", right: "#db36a4",},
      {left: "#ff4b1f", right: "#1fddff",},
   ]
   useEffect(() => {
      resetTimeout();
      timeoutRef.current = setTimeout(
         () => setIndex((prevIndex) => (prevIndex === sliders.length - 1 ? 0 : prevIndex + 1)),
         delay,
      );
      return () => {
         resetTimeout();
      };
      // eslint-disable-next-line
   }, [index]);
   function boxStyle (index) {
      return {color: isHover ? gradien[index].left : "#fff",}
   };
   return (
      <div className={cx('slider')}>
         <div className={cx('slideshow')}>
            <div
               className={cx('slideshowSlider')}
               style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
            >
               {sliders.map((slider, index) => (
                  <div
                     className={cx('slide')}
                     key={index}
                     style={{ background: `linear-gradient(to right, ${gradien[index].left} 0%, ${gradien[index].right} 100%)` }}
                  >
                     <div className={cx('content')}>
                        <div className={cx('slide-item')}>
                           <div className={cx('slide-title')}>{slider.title}</div>
                           <p className={cx('slide-caption')}>{slider.caption}</p>
                           <Link
                              to={slider.url} 
                              className={cx('slide-action')}
                              style={boxStyle(index)}
                              onMouseEnter={()=>{setIsHover(true);}}
                              onMouseLeave={()=>{setIsHover(false);}}
                        >
                                 {slider.action}
                           </Link>
                        </div>
                        <Link to={slider.url} className={cx('link-img')}>
                           <img className={cx('img')} src={slider.backgroundImage} alt="" />
                        </Link>
                     </div>
                  </div>
               ))}
            </div>

            <nav className={cx('slide-nav')}>
               <div className={cx('slide-change')}>
                  <Link
                     className={cx('prev')}
                     style={{
                        display: sliders.length > 1 ? 'flex' : 'none',
                        backgroundColor:
                           index - 1 > -1
                              ? `${gradien[index-1].left}`
                              : `${gradien[sliders.length - 1].left}`
                     }}
                     onClick={() => {
                        setIndex(index > 0 ? index - 1 : sliders.length - 1);
                     }}
                  ></Link>
               </div>
               <div className={cx('slide-change')}>
                  <Link
                     className={cx('next')}
                     style={{
                        display: sliders.length > 1 ? 'flex' : 'none',
                        backgroundColor:   
                           index + 1 < sliders.length ? `${gradien[index+1].right}` : `${gradien[0].right}`,
                     }}
                     onClick={() => {
                        setIndex(index < sliders.length - 1 ? index + 1 : 0);
                     }}
                  ></Link>
               </div>
            </nav>
         </div>
         <div className={cx('slideshowDots')}>
            {sliders.map((_, idx) => (
               <div
                  key={idx}
                  className={cx('slideshowDot', index === idx ? 'active' : '')}
                  onClick={() => {
                     setIndex(idx);
                  }}
                  style={{ background: index === idx ? `linear-gradient(to right, ${gradien[index].left} 0%, ${gradien[index].right} 100%)` : '#c4c4c4' }}
               ></div>
            ))}
         </div>
      </div>
   );
}

export default Slide2;
