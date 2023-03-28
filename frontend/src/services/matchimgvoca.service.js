import http from '../config/http-common.js';

const findAll = () => {
   return http.get('/matchimgvocas/find/');
};
const findSlug = (slug) => {
   return http.get(`/matchimgvocas/find/${slug}`);
};

const findNew = (limit) => {
   return http.get(`/matchimgvocas/findnew/${limit}`);
};

const findAuthor = (email) => {
   return http.get(`/matchimgvocas/findauthor/${email}`);
};
const MatchimgvocaService = { findAll, findSlug, findNew, findAuthor };

export default MatchimgvocaService;
