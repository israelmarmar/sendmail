var nodemailer = require('nodemailer');
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;  

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.usermail,
    pass: process.env.pswdmail
  }
});


app.get('/', function (req, res) {

  var mailOptions = {
    from: process.env.usermail,
    to: process.env.tomail,
    subject: req.query.subject,
    text: req.query.text
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }

  });

});

app.listen(port, function () {
 console.log("ligado");
});