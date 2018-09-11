var nodemailer = require('nodemailer');
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;  

var transporter = nodemailer.createTransport("SMTP", {
  service: "hotmail", // hostname
  secureConnection: false, // TLS requires secureConnection to be false
  auth: {
    user: process.env.usermail,
    pass: process.env.pswdmail
  }
});

app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
        next();
});

app.get('/', function (req, res) {

  var mailOptions = {
    from: process.env.usermail,
    to: process.env.tomail,
    subject: req.query.subject,
    text: "name: "+req.query.name+"\n"+"email: "+req.query.email+"\n\n"+req.query.text
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
