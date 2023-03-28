const sendEmail = require('../utils/sendEmail');
exports.create = async (req, res) => {
   const email = req.body;
   try {
      await sendEmail(
         email.subject,
         email.message,
         email.email,
         process.env.EMAIL_USER,
         email.email,
      );
      res.status(200).json({ success: true, message: `Email Sent to ${email.email}` });
   } catch (error) {
      res.status(500).json(error.message);
   }
};
