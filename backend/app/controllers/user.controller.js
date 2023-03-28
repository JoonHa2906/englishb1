const db = require('../models');
const User = db.user;
const shortid = require('shortid');
const sendEmail = require('../utils/sendEmail');

// Create and Save a new User
exports.createByEmail = (req, res) => {
    User.findOne({ email: req.body.email })
        .then((data) => {
            if (!data) {
                const user = new User({
                    email: req.body.email,
                    pass: req.body.pass,
                    picture: `https://firebasestorage.googleapis.com/v0/b/doantotnghiep-379304.appspot.com/o/logo%2FlogoBlack.png?alt=media`,
                    //default: logo.png
                    verification: false,
                    verificationCode: shortid.generate(),
                    name: req.body.name,
                    permission: 'user',
                });
                const strContentMail = `<!DOCTYPE html>
          <html>
             <head>
                <meta charset="utf-8" />
                <meta http-equiv="x-ua-compatible" content="ie=edge" />
                <title>Email Confirmation</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <style type="text/css"></style>
             </head>
          
             <body>
                <div style="background-color: #ffffff">
                   <center>
                      <table
                         style="
                            width: 560px;
                            margin: 0;
                            padding: 0;
                            font-family: Helvetica, Arial, sans-serif;
                            border-collapse: collapse !important;
                            height: 100% !important;
                            background-color: #ffffff;
                         "
                         align="center"
                         border="0"
                         cellpadding="0"
                         cellspacing="0"
                         height="100%"
                         width="100%"
                      >
                         <tbody>
                            <tr>
                               <td
                                  align="center"
                                  valign="top"
                                  style="
                                     margin: 0;
                                     padding: 0;
                                     font-family: Helvetica, Arial, sans-serif;
                                     height: 100% !important;
                                  "
                               >
                                  <div
                                     style="
                                        background-color: #ffffff;
                                        color: #202123;
                                        padding: 27px 20px 0 15px;
                                     "
                                  >
                                     <p style="text-align: left; margin: 0">
                                        <img
                                           src="https://lh3.googleusercontent.com/cUIoc8CmjqzmV0ffKcKswfMpjM6em_aK2GlxwJ_5bRCKzCicbA0jBp33vkC53ycFaEsOfGUHwWoYCy9MnNWVE9ggcbR32GZih6ib9S77-HwRhUAXuvJCi48CXe2uTqYAqCssqVTHjb1ycN33A_IMCdV4t1hcU7LgyB8y5HvTKqphcZSPnaK1EYrTcpx9DNikJaRvf0ZgR1GRwgNXYe2Hrj6xW3xdGLi2lP2PjWbhp4VY_mP84fz3i1oCC7ovSQMokDvAM3zK7Xf7K0QGVmb0tK5pBT6Hd6qD9EkKL1fu2izMPfqc72_T8JwiaB73kuAbBJMdGok3FCHdvgez92hAP1xgvacxB8x0gUQxTkqWgQyV2fXznGykCjK2kfBGzOogarqfRjjrsXirMlLO3xUKvyq3VpKNZRtrzEd1Uu7Va6CnWyJpYFZofZw2EdJ_sDyNlTdZ1XSmpEqXPhWWKE2sAY9sAM0augRSSLFpvgCDpV8vCCXOp2L9hmjvfqzvo2vTQYadRhKdAYlMI9xaDETy_wA0dTRkvtNuTMb0TWrk5AnD_pCoD9fr9DKYj3XT15RKaqd2CMntE6vnQIW5ucgbP2zdnm2BNxShpE-9DtFmny0yYTYeP4xITetI0VL_XDm0un0Mwc6rr2i1p09t-6uisDJbTXu2Qq5HXyL-PBuHUU3p7cfRJ-HYc1mBityYbYTo9Opxi2Zr80CdJlcylnzIytanmF61Sgii5i3kaTZ4kMOkyWpkT2ko9sewtO-oBszwx4wcxC4dhILgAms-SQlXbBU8qfMmMEhy8aexzVzbXAwoxnhmCtLCEL0tDCdugWDyLiN1r9gQkBtR5fiqxLcwlOcyOFFaQvW2NeKv9jwzNxXPG5aY39dHtkwO-qkSpsdFm5huQX4KZIflNGlo6DTlgZvkl7Qi0v2QT535yhXVY999e7OBLnY2OHVKvL3kKc3v6xhF2uxqN3SOuX-EXFSOOlOSw5MetMct_g6yoMXXwPnfyaLw_Cp1s__ZMPfUYfETKO7I13CQKGI5UVV89T_QN8-KiAytAEBEenp1erOZfNpWVR3hb1HMLDOYTGPIuXQvrh_hldtw823KA9jFTircFGBDuXB_qQbcxQ=w1366-h352-no?authuser=0"
                                           width="560"
                                           height="168"
                                           alt="Tiếng Anh B1"
                                           title="Tiếng Anh B1"
                                           style="
                                              width: 200px;
                                              height: auto;
                                              border: 0;
                                              line-height: 100%;
                                              outline: none;
                                              text-decoration: none;
                                           "
                                           data-bit="iit"
                                           tabindex="0"
                                        />
                                     </p>
                                  </div>
                                  <div
                                     style="
                                        background-color: #ffffff;
                                        color: #353740;
                                        padding: 30px 20px;
                                        text-align: left;
                                        line-height: 1.5;
                                     "
                                  >
                                     <h1
                                        style="
                                           color: #202123;
                                           font-size: 28px;
                                           line-height: 40px;
                                           margin: 0 0 20px;
                                        "
                                     >
                                        Xác minh địa chỉ email của bạn
                                     </h1>
          
                                     <p style="font-size: 16px; line-height: 24px">
                                        Để tiếp tục thiết lập tài khoản của bạn tại Tiếng Anh B1, vui lòng xác
                                        minh rằng đây là địa chỉ email của bạn.
                                     </p>
          
                                     <p style="margin: 24px 0 0; text-align: left">
                                        <a
                                           href="http://localhost:5000/api/users/verification/${user.email}/${user.verificationCode}"
                                           target="_blank"
                                           style="
                                              display: inline-block;
                                              text-decoration: none;
                                              background: #10a37f;
                                              border-radius: 3px;
                                              color: white;
                                              font-family: Helvetica, sans-serif;
                                              font-size: 16px;
                                              line-height: 24px;
                                              font-weight: 400;
                                              padding: 12px 20px 11px;
                                              margin: 0px;
                                           "
                                        >
                                           Xác nhận địa chỉ email
                                        </a>
                                     </p>
                                  </div>
                                  <div
                                     style="
                                        text-align: left;
                                        background: #ffffff;
                                        color: #6e6e80;
                                        padding: 0 20px 20px;
                                        font-size: 13px;
                                        line-height: 1.4;
                                     "
                                  >
                                     <p style="margin: 0">
                                        Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email này. Để
                                        được trợ giúp, hãy liên hệ với chúng tôi qua
                                        <a target="_blank" href="http://localhost:3000/help"
                                           >Trung tâm trợ giúp</a
                                        >.
                                     </p>
                                  </div>
                               </td>
                            </tr>
                         </tbody>
                      </table>
                   </center>
                </div>
             </body>
          </html>`;
                // Save User in the database
                user.save(user)
                    .then((data) => {
                        (async () => {
                            await sendEmail(
                                'Confirm Your Email Address',
                                strContentMail,
                                req.body.email,
                                process.env.EMAIL_USER,
                                req.body.email,
                            )
                                .then((response) => response.json())
                                .catch((err) => {
                                    console.log(err.message);
                                });
                        })();

                        res.send({
                            success: true,
                            message: `Đăng ký tài khoản thành công. Hãy đăng nhập tài khoản email: "${req.body.email}" để xác thực tài khoản của bạn!`,
                        });
                    })
                    .catch((err) => {
                        res.status(500).send({
                            success: false,
                            message:
                                err.message ||
                                'Some error occurred while creating the User.',
                        });
                    });
            } else
                res.send({
                    success: false,
                    message: `Đăng ký tài khoản thất bại. Email "${req.body.email}" đã đăng kí tài khoản rồi! Hãy đăng nhập tài khoản của bạn!`,
                });
        })
        .catch((err) => {
            res.status(500).send({
                success: false,
                message: 'Error retrieving User with email:' + req.body.email,
            });
        });
};

exports.sendPassword = (req, res) => {
    User.findOne({ email: req.body.email, verification: true })
        .then((data) => {
            if (!data) {
                res.send({
                    success: false,
                    message: `Email: "${req.body.email}" chưa đăng kí tài khoản hoặc chưa được xác thực.<br/>Hãy đăng nhập lại, xác thực Email hoặc đăng ký tài khoản!`,
                });
            } else {
                const password = data.pass;
                const strContentMail = `<!DOCTYPE html>
          <html>
             <head>
                <meta charset="utf-8" />
                <meta http-equiv="x-ua-compatible" content="ie=edge" />
                <title>Email Confirmation</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
             </head>
          
             <body>
                <div style="background-color: #ffffff">
                   <center>
                      <table
                         style="
                            width: 560px;
                            margin: 0;
                            padding: 0;
                            font-family: Helvetica, Arial, sans-serif;
                            border-collapse: collapse !important;
                            height: 100% !important;
                            background-color: #ffffff;
                         "
                         align="center"
                         border="0"
                         cellpadding="0"
                         cellspacing="0"
                         height="100%"
                         width="100%"
                      >
                         <tbody>
                            <tr>
                               <td
                                  align="center"
                                  valign="top"
                                  style="
                                     margin: 0;
                                     padding: 0;
                                     font-family: Helvetica, Arial, sans-serif;
                                     height: 100% !important;
                                  "
                               >
                                  <div
                                     style="
                                        background-color: #ffffff;
                                        color: #202123;
                                        padding: 27px 20px 0 15px;
                                     "
                                  >
                                     <p style="text-align: left; margin: 0">
                                        <img
                                           src="https://lh3.googleusercontent.com/cUIoc8CmjqzmV0ffKcKswfMpjM6em_aK2GlxwJ_5bRCKzCicbA0jBp33vkC53ycFaEsOfGUHwWoYCy9MnNWVE9ggcbR32GZih6ib9S77-HwRhUAXuvJCi48CXe2uTqYAqCssqVTHjb1ycN33A_IMCdV4t1hcU7LgyB8y5HvTKqphcZSPnaK1EYrTcpx9DNikJaRvf0ZgR1GRwgNXYe2Hrj6xW3xdGLi2lP2PjWbhp4VY_mP84fz3i1oCC7ovSQMokDvAM3zK7Xf7K0QGVmb0tK5pBT6Hd6qD9EkKL1fu2izMPfqc72_T8JwiaB73kuAbBJMdGok3FCHdvgez92hAP1xgvacxB8x0gUQxTkqWgQyV2fXznGykCjK2kfBGzOogarqfRjjrsXirMlLO3xUKvyq3VpKNZRtrzEd1Uu7Va6CnWyJpYFZofZw2EdJ_sDyNlTdZ1XSmpEqXPhWWKE2sAY9sAM0augRSSLFpvgCDpV8vCCXOp2L9hmjvfqzvo2vTQYadRhKdAYlMI9xaDETy_wA0dTRkvtNuTMb0TWrk5AnD_pCoD9fr9DKYj3XT15RKaqd2CMntE6vnQIW5ucgbP2zdnm2BNxShpE-9DtFmny0yYTYeP4xITetI0VL_XDm0un0Mwc6rr2i1p09t-6uisDJbTXu2Qq5HXyL-PBuHUU3p7cfRJ-HYc1mBityYbYTo9Opxi2Zr80CdJlcylnzIytanmF61Sgii5i3kaTZ4kMOkyWpkT2ko9sewtO-oBszwx4wcxC4dhILgAms-SQlXbBU8qfMmMEhy8aexzVzbXAwoxnhmCtLCEL0tDCdugWDyLiN1r9gQkBtR5fiqxLcwlOcyOFFaQvW2NeKv9jwzNxXPG5aY39dHtkwO-qkSpsdFm5huQX4KZIflNGlo6DTlgZvkl7Qi0v2QT535yhXVY999e7OBLnY2OHVKvL3kKc3v6xhF2uxqN3SOuX-EXFSOOlOSw5MetMct_g6yoMXXwPnfyaLw_Cp1s__ZMPfUYfETKO7I13CQKGI5UVV89T_QN8-KiAytAEBEenp1erOZfNpWVR3hb1HMLDOYTGPIuXQvrh_hldtw823KA9jFTircFGBDuXB_qQbcxQ=w1366-h352-no?authuser=0"
                                           width="560"
                                           height="168"
                                           alt="Tiếng Anh B1"
                                           title="Tiếng Anh B1"
                                           style="
                                              width: 200px;
                                              height: auto;
                                              border: 0;
                                              line-height: 100%;
                                              outline: none;
                                              text-decoration: none;
                                           "
                                           data-bit="iit"
                                           tabindex="0"
                                        />
                                     </p>
                                  </div>
                                  <div
                                     style="
                                        background-color: #ffffff;
                                        color: #353740;
                                        padding: 30px 20px;
                                        text-align: left;
                                        line-height: 1.5;
                                     "
                                  >
                                     <h1
                                        style="
                                           color: #202123;
                                           font-size: 28px;
                                           line-height: 40px;
                                           margin: 0 0 20px;
                                        "
                                     >
                                        Yêu cầu cấp lại mật khẩu
                                     </h1>
          
                                     <p style="font-size: 16px; line-height: 24px">
                                        Chúng tôi nhận được yêu cầu cấp lại mật khẩu của bạn. Mật khẩu cũ của bạn là:
                                     </p>
                                     <p style="margin: 24px 0 0; text-align: left">
                                        <div
                                           style="
                                              display: inline-block;
                                              background: #10a37f;
                                              border-radius: 3px;
                                              color: white;
                                              font-family: Helvetica, sans-serif;
                                              font-size: 16px;
                                              line-height: 24px;
                                              font-weight: 400;
                                              padding: 12px 20px 11px;
                                              margin: 0px;
                                           "
                                        >${password}</div>
                                     </p>
                                  </div>
                                  <div
                                     style="
                                        text-align: left;
                                        background: #ffffff;
                                        color: #6e6e80;
                                        padding: 0 20px 20px;
                                        font-size: 13px;
                                        line-height: 1.4;
                                     "
                                  >
                                     <p style="margin: 0">
                                        Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email này. Để
                                        được trợ giúp, hãy liên hệ với chúng tôi qua
                                        <a target="_blank" href="http://localhost:3000/help"
                                           >Trung tâm trợ giúp</a
                                        >.
                                     </p>
                                  </div>
                               </td>
                            </tr>
                         </tbody>
                      </table>
                   </center>
                </div>
             </body>
          </html>`;
                (async () => {
                    await sendEmail(
                        'Reset Password',
                        strContentMail,
                        req.body.email,
                        process.env.EMAIL_USER,
                        req.body.email,
                    )
                        .then((response) => response.json())
                        .catch((err) => {
                            console.log(err.message);
                        });
                })();
                res.send({
                    success: true,
                    message: `Mật khẩu đăng nhập đã được gửi đến email: "${req.body.email}" của bạn.<br/>Trong trường hợp không tìm thấy email, hãy kiểm tra thư mục Thư rác.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                success: false,
                message: 'Error retrieving User with email:' + req.body.email,
            });
        });
};

exports.createByGoogle = (req, res) => {
    User.findOne({ email: req.body.email })
        .then((data) => {
            if (!data) {
                const user = new User({
                    email: req.body.email,
                    pass: shortid.generate(),
                    picture: req.body.picture,
                    verification: true,
                    name: req.body.name,
                    permission: 'user',
                });
                // Save User in the database
                user.save(user)
                    .then((data) => {
                        res.send({
                            email: data.email,
                            name: data.name,
                            picture: data.picture,
                            permission: data.permission,
                        });
                    })
                    .catch((err) => {
                        res.status(500).send({
                            message:
                                err.message ||
                                'Some error occurred while creating the User.',
                        });
                    });
            } else
                res.send({
                    email: data.email,
                    name: data.name,
                    picture: data.picture,
                    permission: data.permission,
                });
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error retrieving User with email:' + req.body.email,
            });
        });
};

//Login
exports.loginUser = (req, res) => {
    User.findOne({ email: req.body.email, pass: req.body.pass })
        .then((data) => {
            if (!data) {
                res.send({
                    success: false,
                    message: `Email hoặc Mật khẩu đăng nhập không chính xác!`,
                });
            } else
                res.send({
                    success: true,
                    message: `Đăng nhập thành công!`,
                    email: data.email,
                    name: data.name,
                    picture: data.picture,
                    permission: data.permission,
                });
        })
        .catch((err) => {
            res.status(500).send({
                success: false,
                message: 'Error retrieving User with email:' + req.body.email,
            });
        });
};
// Retrieve all Users from the database.
// exports.findAll = (req, res) => {
//   const email = req.query.email;
//   var condition = email ? { email: { $regex: new RegExp(email), $options: "i" } } : {};

//   User.find(condition)
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving users."
//       });
//     });
// };

// Find a single User with an Email
exports.findOne = (req, res) => {
    const email = req.params.email;
    User.findOne({ email: email })
        .then((data) => {
            if (!data)
                res.status(404).send({ message: 'Not found User with email ' + email });
            else
                res.send({
                    email: data.email,
                    picture: data.picture,
                    name: data.name,
                    createdAt: data.createdAt,
                });
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error retrieving User with email=' + email,
            });
        });
};

// Update a User by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: 'Data to update can not be empty!',
        });
    }

    const id = req.params.id;

    User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update User with id=${id}. Maybe User was not found!`,
                });
            } else res.send({ message: 'User was updated successfully.' });
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error updating User with id=' + id,
            });
        });
};

exports.updateVerification = (req, res) => {
    const email = req.params.email;
    const verificationCode = req.params.verificationCode;

    User.findOneAndUpdate(
        { email: email, verificationCode: verificationCode, verification: false },
        { verification: true },
        null,
    )
        .then((data) => {
            if (!data) {
                res.redirect('http://localhost:3000/verification/0/0');
                // res.status(404).send({
                //   success: false, message: `Xác thực thất bại!\nTài khoản hoặc mã xác thực không đúng.\nHoặc bạn đã xác thực tài khoản rồi!`
                // });
            } else {
                res.redirect('http://localhost:3000/verification/1/1');
                // res.send({ success: true, message: `Xác thực Thành công!\nHãy đăng nhập tài khoản của bạn!` });
            }
        })
        .catch((err) => {
            // res.status(500).send({ success: false,
            //   message: `Error updating User with email: ${email}`
            // });
            res.redirect('http://localhost:3000/verification/0/2');
        });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    User.findByIdAndRemove(id, { useFindAndModify: false })
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete User with id=${id}. Maybe User was not found!`,
                });
            } else {
                res.send({
                    message: 'User was deleted successfully!',
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Could not delete User with id=' + id,
            });
        });
};

// // Delete all Users from the database.
// exports.deleteAll = (req, res) => {
//   User.deleteMany({})
//     .then(data => {
//       res.send({
//         message: `${data.deletedCount} Users were deleted successfully!`
//       });
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all Users."
//       });
//     });
// };
exports.getName = (req, res) => {
    User.findOne({ _id: req.params.id })
        .then((data) => {
            res.send({ name: data.name });
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error retrieving User with email:' + req.body.email,
            });
        });
};
exports.getInfoByEmail = (req, res) => {
    User.findOne({ email: req.params.email })
        .then((data) => {
            res.send({
                name: data.name,
                email: data.email,
                picture: data.picture,
                id: data._id,
                createdAt: data.createdAt,
            });
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error retrieving User with email:' + req.body.email,
            });
        });
};
exports.updatePicture = (req, res) => {
    User.findOneAndUpdate({ email: req.body.email }, { picture: req.body.picture }, null)
        .then((data) => {
            if (!data) {
                res.send({ success: false, message: 'Not found ' + req.body.email });
            } else {
                res.send({
                    success: true,
                    message: `Update Avatar Success`,
                    email: data.email,
                    name: data.name,
                    picture: req.body.picture,
                    permission: data.permission,
                });
            }
        })
        .catch((err) => {
            res.send({ success: false, message: 'ERROR' });
        });
};
exports.updateName = (req, res) => {
    User.findOneAndUpdate({ email: req.body.email }, { name: req.body.name }, null)
        .then((data) => {
            if (!data) {
                res.send({ success: false, message: 'Not found ' + req.body.email });
            } else {
                res.send({
                    success: true,
                    message: `Update Avatar Success`,
                    email: data.email,
                    name: req.body.name,
                    picture: data.picture,
                    permission: data.permission,
                });
            }
        })
        .catch((err) => {
            res.send({ success: false, message: 'ERROR' });
        });
};

exports.updatePass = (req, res) => {
    User.findOneAndUpdate({ email: req.body.email }, { pass: req.body.pass }, null)
        .then((data) => {
            if (!data) {
                res.send({ success: false, message: 'Not found ' + req.body.email });
            } else {
                res.send({
                    success: true,
                    message: `Update Password Success`,
                });
            }
        })
        .catch((err) => {
            res.send({ success: false, message: 'ERROR' });
        });
};
