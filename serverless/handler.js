var CONTACT_ADDRESS = 'mag.shehu@gmail.com';
var querystring = require('querystring');

var mailer = require('nodemailer').createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL_ADDRESS,
    pass: process.env.GMAIL_PASSWORD,
  }
});

module.exports.contact = (event, context, callback) => {
  // var body = querystring.parse(event.body);
  mailer.sendMail({
    from: event.email,
    to: [CONTACT_ADDRESS],
    subject: `SHEHU.DEV | You got a message from ${event.name}` || '[No subject]',
    html: `${event.message} \n\n Message them back on ${event.email}` || '[No message]',
  }, function(err, info) {
    if (err) return callback(err);
    callback(null, {statusCode: 200, body: "Success!"});
  });
};