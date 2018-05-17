var nodemailer = require('nodemailer');
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;  

var transporter = nodemailer.createTransport({
  service: 'Gmail',
  tls: {
        rejectUnauthorized: false
    },
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

  console.log(process.env.usermail);

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      res.json({msg: info.response});
    }

  });

});

app.listen(port, function () {
 console.log("ligado");
});
