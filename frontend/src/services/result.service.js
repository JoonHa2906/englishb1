import http from '../config/http-common.js';

const findAll = (slug) => {
    return http.get(`/results/find/${slug}`);
};
const getCount = (slug) => {
    return http.get(`/results/getcount/${slug}`);
};
const top3 = (slug) => {
    return http.get(`/results/top3/${slug}`);
};
const findEmail = (email, slug) => {
    return http.get(`/results/findemail/${email}/${slug}`);
};

const create = (data) => {
    return http.post(`/results/create/`, data);
};
const getExam = (data) => {
    return http.post(`/results/getexam/`, data);
};
const updateTimeBegin = (data) => {
    return http.post(`/results/updatetimebegin/`, data);
};
const getChoice = (data) => {
    return http.post(`/results/getchoice/`, data);
};
const updateChoice = (data) => {
    return http.post(`/results/updatechoice/`, data);
};
const submit = (data) => {
    return http.post(`/results/submit/`, data);
};

const ResultsService = {
    submit,
    updateChoice,
    getChoice,
    updateTimeBegin,
    getCount,
    findAll,
    create,
    findEmail,
    top3,
    getExam,
};

export default ResultsService;
