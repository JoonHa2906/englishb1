import http from '../config/http-common.js';

const findAll= () =>{
   return http.get('/sliders/find/');
}

 const SliderService = {findAll};
 
 export default SliderService;