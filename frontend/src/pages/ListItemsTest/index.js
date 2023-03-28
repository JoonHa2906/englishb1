import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from './ListItemsTest.module.scss';
import Items from './Items';
import PropTypes from 'prop-types';
import NotFound from '~/components/NotFound';
import TestingsService from '~/services/testing.service';

const cx = classNames.bind(styles);

const ListItemsTest = ({ limit, titleName }) => {
   const [loading, setLoading] = useState(true);
   const [item, setItem] = useState();
   useEffect(() => {
      setLoading(true);
      limit < 1
         ? (async (e) => {
              await TestingsService.findAll()
                 .then((response) => {
                    setItem(response.data);
                 })
                 .then(() => {
                    setLoading(false);
                 })
                 .catch((err) => {
                    console.log(err);
                    setLoading(false);
                 });
           })()
         : (async (e) => {
              await TestingsService.findNew(limit)
                 .then((response) => {
                    setItem(response.data);
                 })
                 .then(() => {
                    setLoading(false);
                 })
                 .catch((err) => {
                    console.log(err);
                    setLoading(false);
                 });
           })();
   }, [limit]);
   return (
      <div className={cx('content')}>
         <h1 className={cx('title')}>{titleName}</h1>
         {item && (
            <div className={cx('row')}>
               {item.length > 0
                  ? item.map((itemSub, index) => (
                       <div className={cx('item')} key={index}>
                          <Items
                             key={index}
                             slug={itemSub.slug}
                             title={itemSub.title}
                             author={itemSub.author}
                             url={itemSub.url}
                             testing={'testing'}
                             createdAt={itemSub.createdAt}
                             timeStart={itemSub.timeStart}
                             timeEnd={itemSub.timeEnd}
                          />
                       </div>
                    ))
                  : !loading && <NotFound />}
            </div>
         )}
      </div>
   );
};

ListItemsTest.propTypes = {
   limit: PropTypes.number.isRequired,
   titleName: PropTypes.string.isRequired,
};
export default ListItemsTest;
