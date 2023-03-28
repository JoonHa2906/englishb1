import classNames from 'classnames/bind';
import Slider from '~/components/Slider';
import styles from './Home.module.scss';
import SliderService from '~/services/slider.service';

import { useEffect, useState } from 'react';
import ListItems from '../ListItems';

const cx = classNames.bind(styles);

function Home() {
   const [slider, setSlider] = useState();
   useEffect(() => {
      (async (e) => {
         await SliderService.findAll() 
         .then((response) => setSlider(response.data))
         .catch((err) => {
            console.log(err);
         });
      })();
   }, []);
   
   return (
      <div className={cx('home')}>
         {slider && slider.length > 1 && <Slider sliders={slider} />}
         <div className={cx('new')}>
            <ListItems limit={8} titleName = "New Reading Test" type = "reading"/>
         </div>
         <div className={cx('new')}>
            <ListItems limit={8} titleName = "New Listening Test" type = "listening"/>
         </div>
      </div>
   );
}

export default Home;
