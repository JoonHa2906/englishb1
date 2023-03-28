module.exports = (app) => {
    const results = require('../controllers/result.controller.js');
    var router = require('express').Router();

    // Retrieve all Listenings
    router.get('/find/:slug', results.findAll);
    router.get('/getcount/:slug', results.getCount);
    router.get('/top3/:slug', results.top3);
    router.post('/create/', results.create);
    router.get('/findemail/:email/:slug', results.findEmail);
    router.post('/getexam/', results.getExam);
    router.post('/updatetimebegin/', results.updateTimeBegin);
    router.post('/getchoice/', results.getChoice);
    router.post('/updatechoice/', results.updateChoice);
    router.post('/submit/', results.submit);

    app.use('/api/results', router);
};
