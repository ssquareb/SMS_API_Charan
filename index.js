const express = require('express');
const bodyParser = require('body-parser');
const Vonage = require('@vonage/server-sdk');

const vonage = new Vonage({
  apiKey: '65d8a796',
  apiSecret: 'bI49OhOPWErV0ACm',
});
const app = express();
app.use(bodyParser.json());

app.post('/sms', (req, res) => {
  const phoneNumber = req.body.phoneNumber;
  const message = req.body.message;
  const from = 'ssquareb';

  vonage.message.sendSms(from, phoneNumber, message, (err, responseData) => {
    if (err) {
      console.log(err);
    } else {
      if (responseData.messages[0]['status'] === '0') {
        console.log('Message sent successfully.');
        res.status(200).send('Sent successfully');
      } else {
        console.log(
          `Message failed with error: ${responseData.messages[0]['error-text']}`
        );
        res.status(404).send('Sent Failed');
      }
    }
  });

  console.log(phoneNumber + ' ' + message);
});
app.listen(3000, () => {
  console.log('server listening on Port 3000');
});
