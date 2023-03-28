import classNames from 'classnames/bind';
import styles from './Dictionary.module.scss';
import React, { useState, useEffect } from 'react';
import Result from './Result';

const cx = classNames.bind(styles);

function Dictionary() {
    const [text, setText] = useState('');
    const [meanings, setMeanings] = useState([]);
    const [phonetics, setPhonetics] = useState([]);
    const [word, setWord] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [change, setChange] = useState(true);

    const dictionaryApi = (text) => {
        setLoading(true);
        let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${text}`;
        fetch(url)
            .then((res) => res.json())
            .then((result) => {
                setMeanings(result[0].meanings);
                setPhonetics(result[0].phonetics);
                setWord(result[0].word);
                setError('');
            })
            .then(() => {
                setLoading(false);
            })
            .catch((err) => {
                setError(err);
                setLoading(false);
            });
    };

    const reset = () => {
        setError('');
        setMeanings([]);
        setPhonetics([]);
        setWord('');
    };

    useEffect(() => {
        if (!text.trim()) return reset();
        window.scrollTo({
            top: 0,
            behavior: `smooth`,
        });
        const debounce = setTimeout(() => {
            Promise.resolve()
                .then(() => {
                    setChange(false);
                })
                .then(() => {
                    dictionaryApi(text);
                });
        }, 800);
        return () => clearTimeout(debounce);
    }, [text]);

    return (
        <div>
            <h1 className={cx('title')}>English Dictionary</h1>

            <div className={cx('search')}>
                <input
                    type="text"
                    name="search"
                    id="search"
                    placeholder="Search English B1's Dictionary"
                    autoComplete="off"
                    spellCheck="false"
                    className={cx('input-search')}
                    value={text}
                    onChange={(e) => {
                        setText(e.target.value);
                        setError('');
                        setChange(true);
                    }}
                />
                <label htmlFor="search" className={cx('label-search')}>
                    Search English B1's Dictionary
                </label>
            </div>
            {loading && (
                // <div className={cx('center-body')}>
                //    <div className={cx('loader-ball')}>
                //       <div></div>
                //       <div></div>
                //       <div></div>
                //       <div></div>
                //    </div>
                // </div>

                <div
                    aria-label="Orange and tan hamster running in a metal wheel"
                    role="img"
                    className={cx('wheel-and-hamster')}
                >
                    <div className={cx('wheel')}></div>
                    <div className={cx('hamster')}>
                        <div className={cx('hamster__body')}>
                            <div className={cx('hamster__head')}>
                                <div className={cx('hamster__ear')}></div>
                                <div className={cx('hamster__eye')}></div>
                                <div className={cx('hamster__nose')}></div>
                            </div>
                            <div className={cx('hamster__limb', 'hamster__limb--fr')}></div>
                            <div className={cx('hamster__limb', 'hamster__limb--fl')}></div>
                            <div className={cx('hamster__limb', 'hamster__limb--br')}></div>
                            <div className={cx('hamster__limb', 'hamster__limb--bl')}></div>
                            <div className={cx('hamster__tail')}></div>
                        </div>
                    </div>
                    <div className={cx('spoke')}></div>
                </div>
            )}
            {!change && !loading && text.trim() !== '' && !error && (
                <Result word={word} meanings={meanings} phonetics={phonetics} setText={setText} />
            )}
            {!change && !loading && text.trim() !== '' && error && (
                <div className={cx('error')}>
                    No exact match found for <span className={cx('danger')}>{text.trim()}</span> in
                    English
                </div>
            )}
        </div>
    );
}

export default Dictionary;
