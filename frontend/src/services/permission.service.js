import http from '../config/http-common.js';

const create = (data) => {
   return http.post('/permissions/create/', data);
};
const deletePermission = (id) => {
   return http.get(`/permissions/delete/${id}`);
};
const update = (data) => {
   return http.post(`/permissions/update`, data);
};

const PermisstionService = {
   create,
   update,
   deletePermission,
};

export default PermisstionService;
