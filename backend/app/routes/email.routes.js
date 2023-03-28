module.exports = app => {
    const email = require("../controllers/email.controller.js");
  
    var router = require("express").Router();
    // Create a new Email
    router.post("/", email.create);
    app.use("/api/email", router);
  };
  