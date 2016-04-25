var express    = require('express');
var app        = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('port', (process.env.PORT || 5000));

app.get('/', function (req, res) {
  res.status(200).send('Hello World!');
});

app.get('/webhoo/', function (req, res) {
  if (req.query && req.query['hub.verify_token'] && req.query['hub.verify_token'] === 'whitewalkers') {
    res.status(200).send(req.query['hub.challenge']);
  }
  else 
    res.status(200).send('Error, wrong validation token');
})

app.post('/webhook/', function (req, res) {
//  req = JSON.parse(req)
  console.log("The request received is ", req.body)
  if (req.body && req.body.entry && req.body.entry[0].messaging) {
    messaging_events = req.body.entry[0].messaging;
    for (i = 0; i < messaging_events.length; i++) {
      event = req.body.entry[0].messaging[i];
      sender = event.sender.id;
      if (event.message && event.message.text) {
        text = event.message.text;
        console.log('The message received is ', text)
      }
    }
  }
  res.sendStatus(200);
});

app.listen(app.get('port'), function () {
  console.log('Example app listening on port ',  app.get('port'));
});

