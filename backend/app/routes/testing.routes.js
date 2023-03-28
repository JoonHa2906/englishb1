module.exports = (app) => {
    const testings = require('../controllers/testing.controller.js');
    var router = require('express').Router();

    // Retrieve all Listenings
    router.get('/find/', testings.findAll);
    router.get('/find/:slug', testings.findSlug);
    router.get('/findnew/:limit', testings.findNew);
    router.get('/findauthor/:email', testings.findAuthor);

    app.use('/api/testings', router);
};
