const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors')
const config = require('./config');

// config cors
app.use(cors());
// config body parser
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

// set security filter
const filter = (req, res, next) => {
  let security = config.get("security");
  let whitelist = security.whitelist.split(",");
  if (whitelist.length > 0 && (!whitelist.includes(req.ip)
      && !whitelist.includes(req.hostname))) {
    res.json({code: 403, message: "Not Allowed!"})
  } else {
    next();
  }
};
app.all("*", filter);

app.post('/notify', (req, res) => {
  let type = req.query.type || "email";
  let result = {code: 0, message: "success"};

  if (type === "email") {
    sendEmail(req.body || {}, config.get(type), function (err, info) {
      if (err) {
        result.code = 500;
        result.message = err;
      } else {
        result.info = info;
      }
      res.json(result);
      console.log(
          "Send notify. type: " + type + ", data: " + JSON.stringify(req.query)
          + ", result: " + JSON.stringify(result));
    })
  }
});

function sendEmail(data, config, callback) {
  let transport = nodemailer.createTransport(config.sender);

  // config email info
  let to = data.to || config.receiver;
  let mailOptions = {
    from: config.sender.auth.user, // sender email
    to: to,
    subject: data.title || "Notify message",
    html: data.html
  };

  // send email
  transport.sendMail(mailOptions, callback);
}

app.listen(3000, () => console.log('Example app listening on port 3000!'));