import classNames from 'classnames/bind';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Reviews from '~/components/Reviews';
import ReadingService from '~/services/reading.service';
import Question from './Question';
import styles from './ReadingSlug.module.scss';
import { useCookies } from 'react-cookie';

const cx = classNames.bind(styles);

function ReadingSlug() {
   const [cookies] = useCookies(['email']);
   const [reading, setReading] = useState();
   const [scores, setScores] = useState([]);
   const [submit, setSubmit] = useState(false);
   const history = useNavigate();
   const { slug } = useParams();
   useEffect(() => {
      (async (e) => {
         await ReadingService.findSlug(slug)
            .then((response) => {
               if (!response.data.success) history('/reading');
               setReading(response.data);
            })
            .catch((err) => {
               history('/reading');
            });
      })();
   }, [slug, history]);
   useEffect(() => {
      if (reading) {
         var score = [];
         for (let i = 0; i < reading.data.question.length; ++i) score.push(false);
         setScores(score);
      }
   }, [reading]);
   const questionRef = useRef();
   const handleSubmit = (e) => {
      e.target.style.display = 'none';
      setSubmit(true);
      questionRef.current.scrollTo({
         top: 0,
         behavior: `smooth`,
      });
   };
   function GetScores() {
      var count = 0;
      scores.forEach((score) => {
         if (score) ++count;
      });
      return count;
   }

   const translateRefs = useRef({});
   const toggleRefs = useRef({});

   const handleExtraExample = (index, e) => {
      if (translateRefs.current[index].style.display === 'block') {
         translateRefs.current[index].style.display = 'none';
         toggleRefs.current[
            index
         ].innerHTML = `<i class="bi bi-plus-lg success"></i><span class="success"> Show Translation</span>`;
         toggleRefs.current[index].style.backgroundColor = '#defad7';
         toggleRefs.current[index].style.borderLeft = '4px solid #8bf06e';
      } else {
         translateRefs.current[index].style.display = 'block';
         toggleRefs.current[
            index
         ].innerHTML = `<i class="bi bi-x-lg danger"></i><span class="danger"> Hide Translation</span>`;
         toggleRefs.current[index].style.backgroundColor = '#faded7';
         toggleRefs.current[index].style.borderLeft = '4px solid #f08b6e';
      }
   };

   return reading && reading.success ? (
      <div className={cx('content')}>
         <h1
            className={cx('title')}
            dangerouslySetInnerHTML={{ __html: `B1 Reading Test - ${reading.data.title}` }}
         ></h1>
         <div className={cx('action')} dangerouslySetInnerHTML={{ __html: reading.data.action }}></div>
         <div className={cx('row')}>
            <div className={cx('col-lg-6 col-md-6 col-sm-12', 'paragraph')}>
               <div className={cx('partition')}>
                  <h2
                     className={cx('primary')}
                     dangerouslySetInnerHTML={{ __html: reading.data.title }}
                  ></h2>
                  {reading.data.content.map((content, index) => (
                     <div key={index}>
                        <div
                           className={cx('body')}
                           key={index}
                           dangerouslySetInnerHTML={{ __html: content.text }}
                        ></div>
                        {submit ? (
                           <div className={cx('hints')}>
                              <div
                                 className={cx('toggle')}
                                 onClick={(e) => handleExtraExample(index, e)}
                                 ref={(element) => {
                                    toggleRefs.current[index] = element;
                                 }}
                              >
                                 <i className="bi bi-plus-lg success"></i>{' '}
                                 <span className="success"> Show Translation</span>
                              </div>
                              <div
                                 className={cx('hide')}
                                 ref={(element) => {
                                    translateRefs.current[index] = element;
                                 }}
                                 dangerouslySetInnerHTML={{ __html: content.translate }}
                              ></div>
                           </div>
                        ) : (
                           <></>
                        )}
                     </div>
                  ))}
               </div>
            </div>
            <div className={cx('col-lg-6 col-md-6 col-sm-12', 'paragraph')}>
               <div className={cx('partition')} ref={questionRef}>
                  {submit ? (
                     <div>
                        <h2 className={cx('danger')}>Result</h2>
                        <div className={cx('result-info')}>
                           You have completed this test.
                           <br />
                           Correct answers: {`${GetScores()}/${scores.length}`}.<br />
                           <div className={cx('progress-bar')}>
                              <div className={cx('bar-title')}>YOUR SCORE</div>
                              <div className={cx('bar')}>
                                 <div
                                    className={cx('bar-inner')}
                                    style={{
                                       width: `${Math.round((GetScores() * 100) / scores.length)}%`,
                                    }}
                                 ></div>
                                 <div className={cx('bar-percent')}>{`${Math.round(
                                    (GetScores() * 100) / scores.length,
                                 )}%`}</div>
                              </div>
                           </div>
                           Check your answers
                        </div>
                     </div>
                  ) : (
                     <h2 className={cx('danger')}>Reading comprehension test</h2>
                  )}

                  {reading.data.question.map((question, index) => (
                     <Question
                        key={index}
                        title={question.title}
                        index={index}
                        answer={question.answer}
                        submit={submit}
                        setScores={setScores}
                     />
                  ))}
                  <div className={cx('center')}>
                     <button className={cx('submit')} onClick={handleSubmit}>
                        Submit
                     </button>
                  </div>
               </div>
            </div>
         </div>
         <div className={cx('row')}>
            <div className={cx('col-md-6 col-12', 'reviews')}>
               {cookies.email && cookies.email.email ? (
                  <Reviews email={cookies.email.email} slug={slug} type={'reading'} />
               ) : (
                  <Reviews slug={slug} type={'reading'} />
               )}
            </div>
         </div>
      </div>
   ) : (
      <></>
   );
}

export default ReadingSlug;
