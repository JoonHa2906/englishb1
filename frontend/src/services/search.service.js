import http from '../config/http-common.js';

const findUser = (key) => {
   return http.get(`/searchs/finduser/${key}`);
};
const findRead = (key) => {
   return http.get(`/searchs/findread/${key}`);
};
const findListen = (key) => {
   return http.get(`/searchs/findlisten/${key}`);
};
const findGame = (key) => {
   return http.get(`/searchs/findgame/${key}`);
};
const findTest = (key) => {
   return http.get(`/searchs/findtest/${key}`);
};

const SearchService = { findUser, findRead, findListen, findGame, findTest };

export default SearchService;
