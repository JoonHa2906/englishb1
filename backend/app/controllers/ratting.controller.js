const db = require("../models");
const Ratting = db.ratting;
const User = db.user;

// Retrieve all Rattings from the database.
exports.average = (req, res) => {
  Ratting.find({slug: req.params.slug, type: req.params.type}, ["score"])
    .then(data => {
      if (data.length > 0){
        var result = data.reduce(function(avr, item){
          return avr += item.score;
        }, 0);
        res.send({count: data.length, average: Math.round(result/data.length*10)/10});
      }
      else{
        res.send({count: 0, average: 5});
      }
      
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving ratting."
      });
    });
};

exports.getAll = (req, res) => {
  Ratting.find({slug: req.params.slug, type: req.params.type}, ["createdAt", "score", "email", "comment"], { sort:{ _id: -1 }})
    .then(data => { 
      const responses = [];
      var avr = 0;
      if (data.length > 0){
        data.map((response)=>{
          avr += response.score;
          responses.push({email: response.email,score: response.score, comment: response.comment, createdAt: response.createdAt})
        })
        res.send({average: Math.round(avr/responses.length*10)/10, data: responses});
      }
      else 
        res.send({average: 5, data: []});
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving ratting."
      });
    });
};

exports.findCheck = (req, res) => {
  Ratting.findOne({slug: req.params.slug, type: req.params.type, email: req.params.email})
    .then(data => { 
      if (data){
        res.send({ratting: true, score: data.score, comment: data.comment, id: data._id, message: `Bạn đã đánh giá bài viết rồi. <br/>Điểm đánh giá của bạn: ${data.score}`});
      }
      else{
        res.send({ratting: false, message: "Bạn chưa đánh giá bài viết này."});
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

exports.create = (req, res) => {
  Ratting.findOne({slug: req.body.slug, type: req.body.type, email: req.body.email})
    .then(data => { 
      if (data){
        res.send({ratting: true, message: `Bạn đã đánh giá bài viết rồi. <br/>Điểm đánh giá của bạn: ${data.score}`});
      }
      else{
        //Đánh giá mới
        const ratting = new Ratting({
          email: req.body.email,
          type: req.body.type,
          slug: req.body.slug,
          score: req.body.score, 
          comment: req.body.comment
        });
        ratting
        .save(ratting)
        .then(data => {
          res.send({success: true, message: "Thêm Đánh giá thành công!"});
        })
        .catch(err => {
          res.status(500).send(res.send({success: false, message: "Thêm Đánh giá thất bại!"}));
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

exports.delete = (req, res) => {
  const id = req.body.id;
  Ratting.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.send({success: false, message: "Không tìm thấy Đánh giá!"});
      } else {
        res.send({success: true, message: "Đã xóa Đánh giá!"});
      }
    })
    .catch(err => {
      res.send({success: false, message: "Lỗi xóa Đánh giá!"});
    });
};

exports.update = (req, res) => {
  const id = req.body.id;
  User.findOneAndUpdate({_id: id }, 
    {score: req.body.score}, null)
    .then(data => {
      if (!data) {
        res.send({success: false, message: "không tìm thấy Đánh giá!"});
      } else {
        res.send({success: true, message: "Update success!"});
      }
    })
    .catch(err => {
      res.send({success: false, message: "Error"});
    });
};