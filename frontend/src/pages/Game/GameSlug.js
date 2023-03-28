import classNames from 'classnames/bind';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MatchimgvocaService from '~/services/matchimgvoca.service';
import styles from './GameSlug.module.scss';
import { useCookies } from 'react-cookie';
import Reviews from '~/components/Reviews';

const cx = classNames.bind(styles);
const synth = window.speechSynthesis;

function GameSlug() {
   const history = useNavigate();
   const [cookies] = useCookies(['email']);
   const { slug } = useParams();
   const [content, setContent] = useState(null);
   const [vocabulary, setVocabulary] = useState(null);
   const [vocabularyShuffle, setVocabularyShuffle] = useState(null);
   const [img, setImg] = useState(null);
   const [word, setWord] = useState(null);
   const picRefs = useRef({});
   const wordRefs = useRef({});
   const [score, setScore] = useState(0);
   const [end, setEnd] = useState(true);
   const [first, setFirst] = useState(true);
   const [wrong, setWrong] = useState(false);

   const handleSpeakGG = (word) => {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.voice = synth.getVoices()['Google UK English Male'];
      synth.speak(utterance);
   };
   function reset() {
      setFirst(false);
      setContent(null);
      setVocabularyShuffle(null);
      setVocabulary(null);
      setScore(0);
      setEnd(false);
      handleSpeakGG('start');
   }
   useEffect(() => {
      function shuffle(array) {
         let shuffled = array
            .map((value) => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
         return shuffled;
      }
      if (vocabulary === null)
         (async (e) => {
            await MatchimgvocaService.findSlug(slug)
               .then((response) => {
                  if (!response.data.success) history('/game');
                  setContent(response.data);
                  let voca = shuffle(response.data.data.data).slice(0, 8);
                  setVocabulary(voca);
                  setVocabularyShuffle(shuffle(voca));
               })
               .catch((err) => {
                  history('/game');
               });
         })();
   }, [slug, history, vocabulary]);

   useEffect(() => {
      if (img !== null && word !== null) {
         if (vocabulary[img].key === vocabularyShuffle[word].key) {
            handleSpeakGG(vocabulary[img].key);
            picRefs.current[img].style.visibility = 'hidden';
            wordRefs.current[word].style.visibility = 'hidden';
            const scores = score + 1;
            setScore(scores);
            if (scores === 8) {
               setEnd(true);
            }
         } else {
            setWrong(true);
         }
         const timer = setTimeout(() => {
            setImg(null);
            setWord(null);
            setWrong(false);
         }, 300);
         return () => clearTimeout(timer);
      } // eslint-disable-next-line
   }, [img, word]);

   return content && content.success ? (
      <div className={cx('content')}>
         <h1 className={cx('title')}>{`Play Game - ${content.data.title}`}</h1>
         <div className={cx('action')}>{content.data.action}</div>
         <div className={cx('row', 'game')}>
            <div
               className={cx('col-6')}
               style={first ? { visibility: 'hidden' } : { visibility: 'visible' }}
            >
               <div className={cx('row', 'pic')}>
                  {vocabulary.map((cons, index) => (
                     <div
                        className={cx('col-lg-3 col-md-6 col-6', 'main')}
                        key={index}
                        ref={(element) => {
                           picRefs.current[index] = element;
                        }}
                     >
                        <img
                           className={cx('picture-item')}
                           src={cons.image}
                           alt={'animal'}
                           style={
                              img !== null && img === index && wrong
                                 ? { backgroundColor: '#FD1C03' }
                                 : img !== null && img === index
                                 ? { backgroundColor: '#ffb111' }
                                 : { backgroundColor: '#fff' }
                           }
                           onClick={() => {
                              setImg(index);
                           }}
                        />
                     </div>
                  ))}
               </div>
            </div>

            <div
               className={cx('col-6')}
               style={first ? { visibility: 'hidden' } : { visibility: 'visible' }}
            >
               <div className={cx('row', 'words')}>
                  {vocabularyShuffle.map((cons, index) => (
                     <div
                        className={cx('col-lg-3 col-md-6 col-6', 'main')}
                        ref={(element) => {
                           wordRefs.current[index] = element;
                        }}
                        key={index}
                     >
                        <div
                           className={cx('word-item')}
                           style={
                              word !== null && word === index && wrong
                                 ? { backgroundColor: '#FD1C03', color: '#fff' }
                                 : word !== null && word === index
                                 ? { backgroundColor: '#ffb111', color: '#fff' }
                                 : { backgroundColor: '#fff' }
                           }
                           onClick={() => {
                              setWord(index);
                           }}
                        >
                           {cons.key.toUpperCase()}
                        </div>
                     </div>
                  ))}
               </div>
            </div>
            {end ? (
               <div className={cx('endgame')}>
                  {first ? (
                     <></>
                  ) : (
                     <>
                        <div className={cx('complete')}>COMPLETE</div>
                        <div className={cx('complete2')}>COMPLETE</div>
                     </>
                  )}

                  <div onClick={reset} className={cx('button')}>
                     {first ? 'PLAY' : 'REPLAY'}
                  </div>
               </div>
            ) : (
               <></>
            )}
         </div>
         <div className={cx('row')}>
            <div className={cx('col-md-6 col-12', 'reviews')}>
               {cookies.email && cookies.email.email ? (
                  <Reviews email={cookies.email.email} slug={slug} type={'game'} />
               ) : (
                  <Reviews slug={slug} type={'game'} />
               )}
            </div>
         </div>
      </div>
   ) : (
      <></>
   );
}

export default GameSlug;
