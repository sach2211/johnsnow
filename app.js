var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/', function (req, res) {
  res.status(200).send('Hello World!');
});

app.get('/webhook/', function (req, res) {
//  if (req.query['hub.verify_token'] === 'whitewalkers') {
//    res.status(200).send(req.query['hub.challenge']);
//  }
//  else 
    res.status(200).send('Error, wrong validation token');
})

app.listen(app.get('port'), function () {
  console.log('Example app listening on port ',  app.get('port'));
});

