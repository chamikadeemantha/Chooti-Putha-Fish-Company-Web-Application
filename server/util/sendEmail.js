import nodemailer from "nodemailer";

const sendEmail = async (subject, message, send_to, sent_from, reply_to) => {
  //create email transporter
  const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    auth: {
      user: "chootiputha2001@outlook.com",
      pass: "Kalana2001",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  //options for sending the email
  const options = {
    from: sent_from,
    to: send_to,
    reply_to: reply_to,
    subject: subject,
    html: message,
  };

  //send email

  transporter.sendMail(options, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

export default sendEmail;
