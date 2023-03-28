module.exports = (app) => {
   const listenings = require('../controllers/listening.controller.js');
   var router = require('express').Router();

   // Retrieve all Listenings
   router.get('/find/', listenings.findAll);
   router.get('/find/:slug', listenings.findSlug);
   router.get('/findnew/:limit', listenings.findNew);
   router.get('/findauthor/:email', listenings.findAuthor);

   app.use('/api/listenings', router);
};
