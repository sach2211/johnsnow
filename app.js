var express    = require('express');
var app        = express();
var bodyParser = require("body-parser");
var request    = require("superagent") 

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('port', (process.env.PORT || 5000));

var token = "CAABhQVABjkIBAEdpjB0SsityhI0dQnWNTLKBFaZAtZC5YOeREzdDJevJFLXFonGgl6qmYhn9KGLQ3B3hmygE6VyTBvPguJf9IZBncFcUbqH4YPPp6WZA9kkwFyGeRfKZB8N5RsV1UW4DSV8xkOKnulLPMIfwZAceZCuHOEnwZAcYYTpyFfhFzP79zjDfJydZAKGtoMs0JUekJjwZDZD";

function sendTextMessage(sender, text) {
  messageData = {
    text:text
  }

  request
    .post('https://graph.facebook.com/v2.6/me/messages')
    .set('access_token', token)
    .send( {
      access_token:token,
      recipient: {id:sender},
      message: messageData,
    })
  .end( function(err, res) {
    if (err) {
      console.log('Error sending message: ', err);
    } else {
      console.log('Success ');
    }
  });
}

app.get('/', function (req, res) {
  res.status(200).send('Hello World!');
});

//app.get('/webhoo/', function (req, res) {
//  if (req.query && req.query['hub.verify_token'] && req.query['hub.verify_token'] === 'whitewalkers') {
//    res.status(200).send(req.query['hub.challenge']);
//  }
//  else 
//    res.status(200).send('Error, wrong validation token');
//})

app.post('/webhook/', function (req, res) {
  console.log("The request received is ", req.body)
  if (req.body && req.body.entry && req.body.entry[0].messaging) {
    messaging_events = req.body.entry[0].messaging;
    console.log("The messaging event is ", messaging_events)
    for (i = 0; i < messaging_events.length; i++) {
      event = req.body.entry[0].messaging[i];
      sender = event.sender.id;
      if (event.message && event.message.text) {
        text = event.message.text;
        console.log('The message received is ', text)
	sendTextMessage(sender, "Text received, echo: "+ text.substring(0, 200));
      }
    }
  } else {
      console.log('ERROR in POST request , no body received')
  }
  res.sendStatus(200);
});

app.listen(app.get('port'), function () {
  console.log('Example app listening on port ',  app.get('port'));
});

