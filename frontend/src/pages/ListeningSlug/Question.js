import React, { useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Question.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleExclamation, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const Question = ({ title, index, answer, submit, setScores}) => {
    const [check, setCheck] = useState();
    const suggestRef = useRef();
    const toggleRef = useRef();
    
    const handleExtraExample = (index, e) => {
        if (suggestRef.current.style.display === 'block'){
          suggestRef.current.style.display = 'none';
          toggleRef.current.innerHTML = `<i class="bi bi-plus-lg success"></i><span class="success"> Show Hints</span>`;
          toggleRef.current.style.backgroundColor = "#defad7";
          toggleRef.current.style.borderLeft = "4px solid #8bf06e";
        }
        else {
          suggestRef.current.style.display = 'block';
          toggleRef.current.innerHTML = `<i class="bi bi-x-lg danger"></i><span class="danger"> Hide Hints</span>`;
          toggleRef.current.style.backgroundColor = "#faded7";
          toggleRef.current.style.borderLeft = "4px solid #f08b6e";
        }
    };

    return (
        <div className={cx('question')}>
            <div className={cx("question-title")}>
                <div className={cx("question-title-number")}>{`Question ${index+1}:`}</div>
                <div className={cx("question-title-content")} dangerouslySetInnerHTML={{ __html:  title}}></div>
            </div>
            <div className={cx("answer")}>
                {answer.choice.map((choice, ind)=>(
                    <div className={cx("option")}  key = {ind}>
                        <input 
                            className={cx("input")} 
                            type="radio" 
                            name={`input-${index}`} 
                            value={choice} 
                            id={`input-${index}-${ind}`} 
                            disabled={submit} 
                            onClick={()=>{
                                setCheck(choice);
                                if (choice===answer.correct) 
                                    setScores(
                                        pres => {
                                            pres[index] = true;
                                            return pres;
                                        });
                                else {
                                    setScores(
                                        pres => {
                                            pres[index] = false;
                                            return pres;
                                        });
                                }
                            }}
                        />
                        <label className={cx("label")} htmlFor={`input-${index}-${ind}`}>
                            {choice}
                            {submit && (choice===answer.correct || (check && check === choice)) ? 
                                <label className={cx("iconCheck", choice===answer.correct ? (check ? 'success' : 'warning') : 'danger')}>
                                    <FontAwesomeIcon icon={choice===answer.correct ? (check ? faCircleCheck:faCircleExclamation): faCircleXmark}/>
                                </label>
                                :
                                <></>
                            }
                            
                        </label>
                    </div>
                ))}
            </div>
            <div className={cx("suggest")}>
                {submit ? 
                    <div>
                        <div className={cx("result", !check ? "warning" : check===answer.correct ? "success" : "danger")}>
                            {!check ? "Not selected" : check===answer.correct ? "Correct" : "Incorrect"}
                        </div>
                        <div className={cx('hints')} >
                            <div className={cx('toggle')}  onClick={(e) => handleExtraExample(index, e)} ref = {toggleRef}><i className="bi bi-plus-lg success"></i> <span className="success"> Show Hints</span></div>
                            <div 
                                className={cx('hide')}
                                ref = {suggestRef}
                            >
                                <div>
                                    <b>Question: </b> 
                                    <span dangerouslySetInnerHTML={{ __html:  title}}></span>
                                </div>
                                <div>
                                    <b>Answer Correct: </b> 
                                    <span dangerouslySetInnerHTML={{ __html:  answer.correct}}></span>
                                </div>
                                <div>
                                    <b>Transcription: </b> 
                                    <span dangerouslySetInnerHTML={{ __html:  answer.transcription}}></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    :
                    <></>
                }
            </div>
        </div>
    );
};

export default Question;
