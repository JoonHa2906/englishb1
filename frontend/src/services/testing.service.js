import http from '../config/http-common.js';

const findAll = () => {
   return http.get('/testings/find/');
};
const findSlug = (slug) => {
   return http.get(`/testings/find/${slug}`);
};

const findNew = (limit) => {
   return http.get(`/testings/findnew/${limit}`);
};

const findAuthor = (email) => {
   return http.get(`/testings/findauthor/${email}`);
};

const TestingsService = { findAll, findSlug, findNew, findAuthor };

export default TestingsService;
