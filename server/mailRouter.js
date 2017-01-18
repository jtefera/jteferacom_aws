const aws = require('aws-sdk');

//Mail config
//Config files with my AWS keys
aws.config.loadFromPath('./server/mail/config.json');

//SES is the AWS service for emails
var ses = new aws.SES();

// send to list
var to = ['jonathantefera@outlook.com']

// this must relate to a verified SES account
var from = 'jonahum@gmail.com'

function mailRouter (req, res) {
	let contactInfo = req.body
	console.log("..........................")
	console.log(contactInfo)
	console.log("..........................")
	// this sends the email
	// @todo - add HTML version
	let subjectMessage = "jtefera.com: " + contactInfo.name,
			messageText = "Message by " + contactInfo.name + "\n"
										+ "Email: " + contactInfo.email + "\n"
										+ "Phone: " + contactInfo.phone + "\n"
										+ "Message: " + contactInfo.message + "\n"
										+ "Date: " + new Date() + "\n"
										+ "Unformatted" + JSON.stringify(req.body, null, "");
	ses.sendEmail( {
	   Source: from,
	   Destination: { ToAddresses: to },
	   Message: {
	       Subject: {
	          Data: subjectMessage
	       },
	       Body: {
	           Text: {
	               Data: messageText
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

	res.json(contactInfo)

};

module.exports = mailRouter;