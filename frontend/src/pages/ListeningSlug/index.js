import classNames from 'classnames/bind';
import React, { useEffect, useRef, useState  } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ListeningService from '~/services/listening.service';
import Question from './Question';
import styles from './ListeningSlug.module.scss';
import ReactPlayer from 'react-player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import Reviews from '~/components/Reviews';
import { useCookies } from 'react-cookie';

const cx = classNames.bind(styles);

function ListeningSlug() {
   const [cookies] = useCookies(['email']);
   const [listening, setListening] = useState();
   const [scores, setScores] = useState([]);
   const [submit, setSubmit] = useState(false);
   const [isPlay, setIsPlay] = useState(false);
   const [mouse, setMouse] = useState(false);
   const history = useNavigate();
   const { slug } = useParams();
   useEffect(() => {
      (async (e) => {
         await ListeningService.findSlug(slug) 
         .then((response) => {
            if (!response.data.success) history('/listening');
            setListening(response.data);
         })
         .catch((err) => {
            history('/listening');
         });
      })();
   }, [slug, history]);
   useEffect(() => {
      if (listening){
         var score = [];
         for (let i = 0; i<listening.data.question.length; ++i)
            score.push(false);
         setScores(score);
      }
   }, [listening]);
   const questionRef = useRef();
   const handleSubmit = (e)=>{
      e.target.style.display = "none";
      setSubmit(true);
      questionRef.current.scrollTo({
         top: 0,
         behavior: `smooth`,
      });
   }
   function GetScores(){
      var count = 0;
      scores.forEach((score) =>{
         if (score) ++count;
      })
      return count;
   }
   return (
      listening && listening.success?
      <div className={cx('content')}>
         <h1 className={cx('title')}>{`B1 Listening Test - ${listening.data.title}`}</h1>
         <div className={cx('action')}>{listening.data.action}</div>
         <div className={cx('row')}>
            <div className={cx('col-lg-6 col-md-6 col-sm-12','paragraph')}>
               <div className={cx('video')}>
                  <ReactPlayer
                     url={listening.data.content.url}
                     width="100%"
                     playing={isPlay}
                     controls={false}
                     onEnded = {()=>{setIsPlay(false)}}
                  />
                  <div className={cx('controls')} style={{backgroundColor: isPlay ? "transparent" : "#000"}} onMouseEnter={()=>{setMouse(true)}} onMouseOut={()=>{setMouse(false)}} ></div>
                  <div className={cx('button')} onClick={()=>{setIsPlay(!isPlay)}} style={mouse ? {display: "block"} :  (isPlay) ? {display: "none"}: {display: "block"}} onMouseEnter={()=>{setMouse(true)}}>
                     <FontAwesomeIcon icon={isPlay? faPause : faPlay}/>
                  </div>
               </div>
            </div>
            <div className={cx('col-lg-6 col-md-6 col-sm-12','paragraph')} >
               <div className={cx('partition')} ref = {questionRef}>
                  {submit ?
                     <div>
                        <h2 className={cx('danger')}>Result</h2>
                        <div className={cx('result-info')}>
                           You have completed this test.<br/>
                           Correct answers: {`${GetScores()}/${scores.length}`}.<br/>
                           <div className={cx("progress-bar")}>
                              <div className={cx("bar-title")}>YOUR SCORE</div>
                              <div className={cx("bar")}>
                                 <div className={cx("bar-inner")} style={{width: `${Math.round(GetScores()*100/scores.length)}%` }}></div>
                                 <div className={cx("bar-percent")}>{`${Math.round(GetScores()*100/scores.length)}%`}</div>
                              </div>
                              </div>
                           Check your answers
                        </div>
                     </div>
                     :
                     <h2 className={cx('danger')}>Listening comprehension test</h2>
                  }
                  
                  {listening.data.question.map((question, index)=>(
                     <Question
                        key={index}
                        title={question.title}
                        index = {index}
                        answer = {question.answer}
                        submit = {submit}
                        setScores = {setScores}
                     />
                  ))}
                  <div className={cx('center')}>
                     <button className={cx('submit')} onClick={handleSubmit}>Submit</button>
                  </div>
               </div>
            </div>
            
         </div>
         <div className={cx('row')}>
            <div className={cx('col-md-6 col-12','reviews')} >
               {cookies.email && cookies.email.email ? <Reviews
                  email={cookies.email.email}
                  slug = {slug}
                  type = {"listening"}
               />:
               <Reviews
                  slug = {slug}
                  type = {"listening"}
               />}
            </div>  
         </div>
      </div>
   :<></>
   );
}

export default ListeningSlug;
