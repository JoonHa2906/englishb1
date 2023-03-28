module.exports = app => {
  const rattings = require("../controllers/ratting.controller.js");
  var router = require("express").Router();
  
  // Retrieve all Readings
  router.get("/average/:type/:slug", rattings.average);
  router.get("/getall/:type/:slug", rattings.getAll);
  router.get("/check/:type/:slug/:email", rattings.findCheck);
  router.post("/create", rattings.create);
  router.post("/update", rattings.update);
  router.post("/delete", rattings.delete);


  app.use("/api/rattings", router);
};
