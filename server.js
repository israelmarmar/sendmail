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

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'https://israelmarmar.github.io');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
