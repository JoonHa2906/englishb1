const db = require("../models");
const Notification = db.notification;
// Retrieve all Notifications from the database.
exports.findAll = (req, res) => {
  Notification.find({email : req.body.email}, ["content", "type", "link", "_id", "createdAt" ], { sort:{
        _id: -1 
    }})
    .then(data => { 
      const responses = [];
      data.map((response)=>{
        responses.push({content: response.content,   createdAt: response.createdAt ,type: response.type, link: response.link, id: response._id})
      })
      res.send(responses);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving notifications."
      });
    });
};


exports.findNew = (req, res) => {
  Notification.find({email : req.body.email}, ["content", "type", "link", "_id", "createdAt"], { sort:{
    _id: -1 
  }})
    .then(data => { 
      const responses = [];
      data.map((response)=>{
        responses.push({content: response.content,  type: response.type, createdAt: response.createdAt ,link: response.link, id: response._id})
      })
      res.send(responses);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving notifications."
      });
    });
};

exports.create = (req, res) => {
  const notification = new Notification({
    email: req.body.email,
    content: req.body.content,
    type: req.body.type,
    link: req.body.link
  });
  notification
  .save(notification)
  .then(data => {
    res.send({success: true, message: "Thêm thông báo thành công!"});
  })
  .catch(err => {
    res.status(500).send(res.send({success: false, message: "Thêm thông báo thất bại!"}));
  });
};

exports.deleteNotification = (req, res) => {
  const id = req.body.id;
  Notification.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.send({success: false, message: "Không tìm thấy thông báo!"});
      } else {
        res.send({success: true, message: "Đã xóa thông báo!"});
      }
    })
    .catch(err => {
      res.send({success: false, message: "Lỗi xóa thông báo!"});
    });
};

exports.deleteAll = (req, res) => {
  Notification.deleteMany({email: req.body.email})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Notifications were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Notifications."
      });
    });
};