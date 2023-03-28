import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SearchItem from '~/components/SearchItem';
import { useEffect, useState, useRef } from 'react';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { useDebounce } from '~/hooks';
import { faXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';

const cx = classNames.bind(styles);
function Search({ width }) {
   const [searchResult, setSearchResult] = useState(null);
   const [searchValue, setSearchValue] = useState('');
   const [showResult, setShowResult] = useState(false);
   const [loading, setLoading] = useState(true);
   const inputRef = useRef();
   const [searchRead, setSearchRead] = useState(null);
   const [searchListen, setSearchListen] = useState(null);
   const [searchGame, setSearchGame] = useState(null);
   const [searchTesting, setSearchTesting] = useState(null);

   const debounce = useDebounce(searchValue, 500);

   useEffect(() => {
      if (!debounce.trim()) return;
      setLoading(true);
      Promise.resolve()
         .then(() => {
            axios
               .get(`http://localhost:5000/api/searchs/finduser/${debounce}`)
               .then((res) => {
                  setSearchResult(res.data);
               })
               .catch(() => {
                  setSearchResult(null);
               });
         })
         .then(() => {
            axios
               .get(`http://localhost:5000/api/searchs/findread/${debounce}`)
               .then((res) => {
                  setSearchRead(res.data);
               })
               .catch(() => {
                  setSearchRead(null);
               });
         })
         .then(() => {
            axios
               .get(`http://localhost:5000/api/searchs/findlisten/${debounce}`)
               .then((res) => {
                  setSearchListen(res.data);
               })
               .catch(() => {
                  setSearchListen(null);
               });
         })
         .then(() => {
            axios
               .get(`http://localhost:5000/api/searchs/findgame/${debounce}`)
               .then((res) => {
                  setSearchGame(res.data);
               })
               .catch(() => {
                  setSearchGame(null);
               });
         })
         .then(() => {
            axios
               .get(`http://localhost:5000/api/searchs/findtest/${debounce}`)
               .then((res) => {
                  setSearchTesting(res.data);
               })
               .catch(() => {
                  setSearchTesting(null);
               });
         })
         .then(() => {
            setLoading(false);
         })
         .catch((err) => {
            console.log(err);
            setLoading(false);
         });
   }, [debounce]);
   const handleClear = () => {
      setSearchValue('');
      inputRef.current.focus();
      setSearchResult(null);
      setSearchRead(null);
      setSearchListen(null);
      setSearchGame(null);
      setSearchTesting(null);
      setShowResult(false);
   };
   const handleHideResult = () => {
      setShowResult(false);
   };
   const handleChange = (e) => {
      let searchValueChange;
      setSearchResult(null);
      setSearchRead(null);
      setSearchListen(null);
      setSearchGame(null);
      setSearchTesting(null);
      if (e.target.value.startsWith(' ')) {
         searchValueChange = e.target.value.slice(1);
         setSearchValue(searchValueChange);
      } else {
         searchValueChange = e.target.value;
         setSearchValue(searchValueChange);
      }
      if (searchValueChange !== '') setShowResult(true);
      else {
         setShowResult(false);
      }
   };

   return (
      <div>
         <HeadlessTippy
            interactive
            visible={showResult}
            render={(attrs) => (
               <div
                  className={cx('search-result')}
                  style={{ width: width }}
                  tabIndex="-1"
                  {...attrs}
               >
                  <PopperWrapper>
                     {loading ||
                     (!searchResult &&
                        !searchRead &&
                        !searchListen &&
                        !searchGame &&
                        !searchTesting) ? (
                        <div className={cx('search_header')}>
                           <FontAwesomeIcon
                              icon={faMagnifyingGlass}
                              className={cx('search-result-info-icon')}
                           />
                           <div className={cx('search-result-info-title')}>Tìm '{searchValue}'</div>
                           <div className={cx('skeleton')}></div>
                        </div>
                     ) : (searchResult && searchResult.length > 0) ||
                       (searchRead && searchRead.length > 0) ||
                       (searchListen && searchListen.length > 0) ||
                       (searchGame && searchGame.length > 0) ||
                       (searchTesting && searchTesting.length > 0) ? (
                        <div className={cx('search_header')}>
                           <FontAwesomeIcon
                              icon={faMagnifyingGlass}
                              className={cx('search-result-info-icon')}
                           />
                           <div className={cx('search-result-info-title')}>
                              Kết quả cho '{searchValue}'
                           </div>
                        </div>
                     ) : (
                        <div className={cx('search_header')}>
                           <FontAwesomeIcon
                              icon={faMagnifyingGlass}
                              className={cx('search-result-info-icon')}
                           />
                           <div className={cx('search-result-info-title')}>
                              Không có kết quả cho '{searchValue}'
                           </div>
                        </div>
                     )}

                     {searchResult && searchResult.length > 0 && (
                        <>
                           <div className={cx('search-item-header')}>
                              <span className={cx('search-item-header-title')}>USER</span>
                              <Link
                                 to={`/search/users/${debounce}`}
                                 className={cx('search-item-header-link')}
                                 onClick={() => {
                                    setShowResult(false);
                                 }}
                              >
                                 See more
                              </Link>
                           </div>

                           {searchResult.map((result, index) => (
                              <SearchItem
                                 url={`/profile/${result.slug}`}
                                 key={index}
                                 img={result.picture}
                                 title={result.title}
                              />
                           ))}
                        </>
                     )}
                     {searchTesting && searchTesting.length > 0 && (
                        <>
                           <div className={cx('search-item-header')}>
                              <span className={cx('search-item-header-title')}>TESTING</span>
                              <Link
                                 to={`/search/testings/${debounce}`}
                                 className={cx('search-item-header-link')}
                                 onClick={() => {
                                    setShowResult(false);
                                 }}
                              >
                                 See more
                              </Link>
                           </div>

                           {searchTesting.map((result, index) => (
                              <SearchItem
                                 url={`/profile/${result.slug}`}
                                 key={index}
                                 img={result.picture}
                                 title={result.title}
                              />
                           ))}
                        </>
                     )}
                     {searchRead && searchRead.length > 0 && (
                        <>
                           <div className={cx('search-item-header')}>
                              <span className={cx('search-item-header-title')}>READING</span>
                              <Link
                                 to={`/search/readings/${debounce}`}
                                 className={cx('search-item-header-link')}
                                 onClick={() => {
                                    setShowResult(false);
                                 }}
                              >
                                 See more
                              </Link>
                           </div>

                           {searchRead.map((result, index) => (
                              <SearchItem
                                 url={`/profile/${result.slug}`}
                                 key={index}
                                 img={result.picture}
                                 title={result.title}
                              />
                           ))}
                        </>
                     )}
                     {searchListen && searchListen.length > 0 && (
                        <>
                           <div className={cx('search-item-header')}>
                              <span className={cx('search-item-header-title')}>LISTENING</span>
                              <Link
                                 to={`/search/listens/${debounce}`}
                                 className={cx('search-item-header-link')}
                                 onClick={() => {
                                    setShowResult(false);
                                 }}
                              >
                                 See more
                              </Link>
                           </div>

                           {searchListen.map((result, index) => (
                              <SearchItem
                                 url={`/profile/${result.slug}`}
                                 key={index}
                                 img={result.picture}
                                 title={result.title}
                              />
                           ))}
                        </>
                     )}
                     {searchGame && searchGame.length > 0 && (
                        <>
                           <div className={cx('search-item-header')}>
                              <span className={cx('search-item-header-title')}>GAME</span>
                              <Link
                                 to={`/search/games/${debounce}`}
                                 className={cx('search-item-header-link')}
                                 onClick={() => {
                                    setShowResult(false);
                                 }}
                              >
                                 See more
                              </Link>
                           </div>

                           {searchGame.map((result, index) => (
                              <SearchItem
                                 url={`/profile/${result.slug}`}
                                 key={index}
                                 img={result.picture}
                                 title={result.title}
                              />
                           ))}
                        </>
                     )}
                  </PopperWrapper>
               </div>
            )}
            onClickOutside={handleHideResult}
         >
            <div className={cx('header-search')} aria-expanded="false" style={{ width: width }}>
               <button className={cx('header-search-icon')}>
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
               </button>

               <input
                  ref={inputRef}
                  value={searchValue}
                  className={cx('header-search-input')}
                  spellCheck="false"
                  placeholder="Search..."
                  onChange={handleChange}
                  onFocus={(e) => {
                     if (e.target.value !== '') setShowResult(true);
                     else {
                        setShowResult(false);
                     }
                  }}
               />

               {!!searchValue && (
                  <button className={cx('header-search-clear')} onClick={handleClear}>
                     <FontAwesomeIcon icon={faXmark} />
                  </button>
               )}
            </div>
         </HeadlessTippy>
      </div>
   );
}

export default Search;
