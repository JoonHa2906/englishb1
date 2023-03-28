const db = require('../models');
const Permission = db.permission;
const User = db.user;

exports.create = (req, res) => {
   Permission.findOne({ email: req.body.email })
      .then((data) => {
         if (!data) {
            const permission = new Permission({
               email: req.body.email,
               comment: req.body.comment,
            });
            permission
               .save(permission)
               .then((data) => {
                  res.send({
                     success: true,
                     message: `Yêu cầu của bạn đã được gửi đến hệ thống! Hệ thống sẽ có phẩn hồi cho bạn trong thời gian sớm nhất!`,
                  });
               })
               .catch((err) => {
                  res.status(500).send({
                     success: false,
                     message: err.message || 'Some error occurred while creating the Permission.',
                  });
               });
         } else {
            if (data.accept) {
               res.send({
                  success: false,
                  message: `Yêu cầu của bạn đã được xác nhận rồi! Có thể tài khoản của bạn không đủ yêu cầu đề thay đổi quyền!`,
               });
            } else
               res.send({
                  success: false,
                  message: `Bạn đã gửi yêu cầu này rồi! Hãy chờ đợi hệ thống xem xét trong thời gian sớm nhất!`,
               });
         }
      })
      .catch((err) => {
         res.status(500).send({
            success: false,
            message: 'Error retrieving User',
         });
      });
};

exports.delete = (req, res) => {
   const id = req.params.id;
   User.findByIdAndRemove(id, { useFindAndModify: false })
      .then((data) => {
         if (!data) {
            res.status(404).send({
               message: `Cannot delete User with id=${id}. Maybe Permission was not found!`,
            });
         } else {
            res.send({
               message: 'Permission was deleted successfully!',
            });
         }
      })
      .catch((err) => {
         res.status(500).send({
            message: 'Could not delete Permission with id=' + id,
         });
      });
};

exports.update = (req, res) => {
   User.findOneAndUpdate({ email: req.body.email }, { permission: 'teacher' }, null)
      .then((data) => {
         if (!data) {
            res.send({ success: false, message: 'Not found ' + req.body.email });
         } else {
            res.send({
               success: true,
               message: `Update Permission Success`,
            });
         }
      })
      .catch((err) => {
         res.send({ success: false, message: 'ERROR' });
      });
   Permission.findOneAndUpdate({ email: req.body.email }, { accept: true }, null)
      .then((data) => {
         if (!data) {
            res.send({ success: false, message: 'Not found ' + req.body.email });
         } else {
            res.send({
               success: true,
               message: `Update Permission Success`,
            });
         }
      })
      .catch((err) => {
         res.send({ success: false, message: 'ERROR' });
      });
};
