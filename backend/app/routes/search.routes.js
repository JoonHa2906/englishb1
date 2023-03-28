module.exports = (app) => {
    const searchs = require('../controllers/search.controller.js');
    var router = require('express').Router();

    // Retrieve all Readings
    router.get('/finduser/:key', searchs.findUser);
    router.get('/findread/:key', searchs.findRead);
    router.get('/findlisten/:key', searchs.findListen);
    router.get('/findgame/:key', searchs.findGame);
    router.get('/findtest/:key', searchs.findTest);
    router.get('/findalluser/:key', searchs.findUserAll);
    router.get('/findallread/:key', searchs.findReadAll);
    router.get('/findalllisten/:key', searchs.findListenAll);
    router.get('/findallgame/:key', searchs.findGameAll);
    router.get('/findalltest/:key', searchs.findTestAll);

    app.use('/api/searchs', router);
};
