import http from '../config/http-common.js';

const findAll= data =>{
   return http.post('/notifications/find/', data);
}
const findNew= data =>{
   return http.post('/notifications/findNew/', data);
}

const deleteNotification= data =>{
   return http.post('/notifications/deletenotification/', data);
}

const create= data =>{
   return http.post('/notifications/create/', data);
}

const deleteAll= data =>{
   return http.post('/notifications/deleteall/', data);
}

 const NotificationService = {findAll, findNew, deleteNotification, create, deleteAll};
 
 export default NotificationService;