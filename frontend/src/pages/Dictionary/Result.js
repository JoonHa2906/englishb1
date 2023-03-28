import React, { Fragment, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Result.module.scss';
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);
const synth = window.speechSynthesis;

const Result = ({ word, phonetics, meanings, setText }) => {
  const speakRefs = useRef({});
  const extraExampleRefs = useRef({});
  const toggleRefs = useRef({});
  const handleSpeak = (index) => {
    speakRefs.current[index].play();
  };
  const language = (str) => {
    return str.substring(str.length-6,str.length-4).toUpperCase();
    
  };
  const handleSpeakGG = (word) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.voice = synth.getVoices()['Google UK English Male'];
    synth.speak(utterance);
  };
  const handleExtraExample = (index, e) => {
    if (extraExampleRefs.current[index].style.display === 'block'){
      extraExampleRefs.current[index].style.display = 'none';
      toggleRefs.current[index].innerHTML = `<i class="bi bi-plus-lg success"></i><span class="success"> Extra Meanings</span>`;
      toggleRefs.current[index].style.backgroundColor = "#defad7";
      toggleRefs.current[index].style.borderLeft = "4px solid #8bf06e";
    }
    else {
      extraExampleRefs.current[index].style.display = 'block';
      toggleRefs.current[index].innerHTML = `<i class="bi bi-x-lg danger"></i><span class="danger"> Extra Meanings</span>`;
      toggleRefs.current[index].style.backgroundColor = "#faded7";
      toggleRefs.current[index].style.borderLeft = "4px solid #f08b6e";
    }
  };
  
  return (
    <ul className={cx('result')}>
      {/* Phát âm */}
      <li className={cx('word')}>
          <h2 className={cx('title')}>{word}</h2>
          <div className={cx('audio')}>
              <div className={cx('audio-icon', 'GG')} onClick={()=>handleSpeakGG(word)}>
                <FontAwesomeIcon icon={faVolumeHigh}/>
                <span className={cx('audio-lang')}>GG</span>
              </div>
              <span className={cx('audio-content')}>Google UK English</span>
          </div >
          {phonetics.map((phonetic, index) => (
            phonetic.audio ?
            <div className={cx('audio')} key={index}>
              <div className={cx('audio-icon', language(phonetic.audio))} onClick={() => handleSpeak(index)}>
                <FontAwesomeIcon icon={faVolumeHigh}/>
                <span className={cx('audio-lang')}>{language(phonetic.audio)}</span>
              </div>
              
              <span className={cx('audio-content')}>{phonetic.text}</span>
              <audio
                className={cx('audio')}
                src={phonetic.audio}
                ref = {element => {speakRefs.current[index] = element;}}
              />
          </div >:<Fragment key={index}></Fragment>
        ))}
      </li>

      {/* Nghĩa của từ, cách dùng */}
      {meanings.map((meaning, index) => (
        <li className={cx('contain')} key = {index}>
          <h3 key={index} className={cx('partOfSpeech')}>{meaning.partOfSpeech}</h3>
          <div className={cx('details')}>
            <h4 className={cx('titleH4')}>Meaning</h4>
            {meaning.definitions.length<6 ? 
                (<div className={cx('show')}>
                  {meaning.definitions.map((definition, ind) => (
                      <p key={ind}>- {definition.definition}</p>
                    ))}
                </div>)
                :
                (<div>
                    <div className={cx('show')}>
                        {meaning.definitions.map((definition, ind) => (
                            ind<5?
                            <p key={ind}>- {definition.definition}</p>
                            :
                            <Fragment key={ind}/>
                          ))}
                    </div>
                    <div className={cx('extra-examples')} >
                      <div className={cx('toggle')} ref = {element => {toggleRefs.current[index] = element;}}  onClick={(e) => handleExtraExample(index, e)}><i className="bi bi-plus-lg success"></i> <span class="success"> Extra Meanings</span></div>
                      <div 
                        className={cx('hide')} 
                        ref = {element => {extraExampleRefs.current[index] = element;}}
                      >
                          {meaning.definitions.map((definition, ind) => (
                              ind>4?
                              <p key={ind}>- {definition.definition}</p>
                              :
                              <Fragment key={ind}/>
                            ))}
                      </div>
                    </div>
                    
                </div>)
            }
            
      {/* Từ đồng nghĩa */}
          {meaning.synonyms.length !== 0 && (
            <div>
              <h4 className={cx('titleH4')}>Synonyms</h4>
              {meaning.synonyms.map((synonym, index) => (
                <span key={index} className={cx('synonyms')} onClick={() => setText(synonym)}>
                  {`${synonym}`}
                </span>
              ))}
            </div>
          )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Result;
