module.exports = app => {
  const users = require("../controllers/slider.controller.js");

  var router = require("express").Router();
  
  // Retrieve all Sliders
  router.get("/find/", users.findAll);

  app.use("/api/sliders", router);
};
