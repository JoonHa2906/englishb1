module.exports = (app) => {
   const permissions = require('../controllers/permission.controller.js');

   var router = require('express').Router();

   // Create a new permissions
   router.post('/create/', permissions.create);
   router.post('/update/', permissions.update);
   router.get('/delete/', permissions.delete);

   app.use('/api/permissions', router);
};
