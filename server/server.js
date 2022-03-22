const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const webpush = require('web-push')
const cors = require("cors");
const routes = require('./app/routes');
const worker = require('./app/services/worker');
const { firebase: { webPushContact, publicVapidKey, privateVapidKey } } = require('./app/settings');

webpush.setVapidDetails(webPushContact, publicVapidKey, privateVapidKey);

const app = express();


worker.start();
// var corsOptions = {
//   origin: "http://localhost:8081"
// };
// app.use(cors(corsOptions));
app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(cookieParser());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/notifications/subscribe', (req, res) => {
  const subscription = req.body

  console.log("subscription = ", subscription)

  const payload = JSON.stringify({
    title: 'Hello!',
    body: 'It works.',
  })

  webpush.sendNotification(subscription, payload)
    .then(result => {
      console.log("\n\n\n result = ", result)
    })
    .catch(e => {
      console.log("\n\n\nEE = ", e)
      console.log("\n\n\nSTACK = ", e.stack)
    })

  res.status(200).json({'success': true})
});

app.use('/api', routes);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to client-server application." });
});

// error handler
app.use(function (error, req, res, next) {
  logger.error({ error }, 'Error');
  res.status(error.status || 500).json({ error });
});

module.exports = app;