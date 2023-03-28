import http from '../config/http-common.js';

const average = (type, slug) =>{
   return http.get(`/rattings/average/${type}/${slug}`);
}

const getAll = (type, slug) =>{
   return http.get(`/rattings/getall/${type}/${slug}`);
}

const findCheck = (type, slug, email) =>{
   return http.get(`/rattings/check/${type}/${slug}/${email}`);
}

const create = (data) =>{
   return http.post(`/rattings/create`, data);
}

const remove = (data) =>{
   return http.post(`/rattings/delete`, data);
}

const update = (data) =>{
   return http.post(`/rattings/update`, data);
}

 const RattingService = {average, findCheck, update, create, remove, getAll};
 
 export default RattingService;