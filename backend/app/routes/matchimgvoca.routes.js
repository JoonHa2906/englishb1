module.exports = (app) => {
    const matchimgvocas = require('../controllers/matchimgvoca.controller.js');
    var router = require('express').Router();

    // Retrieve all Listenings
    router.get('/find/', matchimgvocas.findAll);
    router.get('/find/:slug', matchimgvocas.findSlug);
    router.get('/findnew/:limit', matchimgvocas.findNew);
    router.get('/findauthor/:email', matchimgvocas.findAuthor);
    // router.get('/updatepicture/:slug', matchimgvocas.updatePicture);

    app.use('/api/matchimgvocas', router);
};
