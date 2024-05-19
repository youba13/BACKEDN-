const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Environment variables for email credentials
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail', // using Gmail; for other services, configuration might vary
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
});
router.post('/', (req, res) => {
  const { to, subject, text } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: to,
    subject: subject,
    text: text
  };

  transporter.sendMail(mailOptions)
  .then((result)=>{
    res.status(200).json({message: "email was sent"})
  })
  .catch((err)=>{
    res.json({message  :err.message})
  });
});

module.exports = router;
 