// load aws sdk
var aws = require('aws-sdk');

// load aws config
aws.config.loadFromPath('config.json');

// load AWS SES
var ses = new aws.SES();

// send to list
var to = ['jonathantefera@outlook.com']

// this must relate to a verified SES account
var from = 'jonahum@gmail.com'


// this sends the email
// @todo - add HTML version
ses.sendEmail( {
   Source: from,
   Destination: { ToAddresses: to },
   Message: {
       Subject: {
          Data: 'A Message To You Rudy'
       },
       Body: {
           Text: {
               Data: 'Stop your messing around',
           }
        }
   }
}
, function(err, data) {
    if(err) {
      throw err
    }

    console.log('Email sent:');
    console.log(data);
 });
