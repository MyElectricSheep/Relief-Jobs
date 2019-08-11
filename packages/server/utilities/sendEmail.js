const aws = require("aws-sdk");
const credentials = new aws.SharedIniFileCredentials({ profile: "reliefjobs" });
aws.config.credentials = credentials;
aws.config.update({ region: "eu-west-1" });

const sendEmail = (to, subject, content) => {
  const ses = new aws.SES();

  /**
   * @TODO
   * Replace hard coded email values with live data
   * It's part of Amazon SES accounts' limitations in Sandbox mode.
   * When ready for production, follow "Moving Out of the Amazon SES Sandbox"
   * https://docs.aws.amazon.com/ses/latest/DeveloperGuide/request-production-access.html
   * To add more sandbox / test emails, follow:
   * https://eu-west-1.console.aws.amazon.com/ses/home?region=eu-west-1#verified-senders-email:
   * */

  const fromSandbox = "ben.paget@live.fr"; // This email address must be verified in Amazon SES
  const toSandbox = "iamthebou@gmail.com"; // This email address must be verified in Amazon SES

  const params = {
    Destination: {
      ToAddresses: [toSandbox]
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: content
        }
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject
      }
    },
    ReplyToAddresses: [fromSandbox],
    Source: fromSandbox
  };

  ses.sendEmail(params, (err, data) => {
    if (err) console.log(err, err.stack);
    else {
      console.log("📨 Email sent successfully ! 📨");
    }
  });
};

module.exports = sendEmail;
