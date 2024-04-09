const Transporter = require("nodemailer").createTransport({
  service: "Gmail",
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

async function sendingMail({ from, to, subject, text }) {
  try {
    let mailOptions = { from, to, subject, text };

    return await Transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { sendingMail };
