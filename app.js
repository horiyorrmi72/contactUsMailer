require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const corsOptions = {
    origin: process.env.SITE_ORIGIN_URL || "http://horiyorrmi72.github.io",
  optionsSuccessStatus: 200,
};

app.post("/submit-form", cors(corsOptions), (req, res) => {
  const { name, subject, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.USER_EMAIL,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: process.env.ACCESS_TOKEN,
    },
  });
  // console.log(process.env.USER_EMAIL);

  const mailOptions = {
    from: `my-portfolio - ${email}`,
    to: process.env.USER_EMAIL,
    subject: subject,
    text: `from: ${email} - \n Message: ${message}`,
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      // console.log(err);
      res.status(500).send({ message: "Error sending email" });
    } else {
      // console.log("Sent mail: " + info.response);
      res.status(200).send({ message: "Email sent successfully" });
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
