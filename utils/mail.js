const nodemailer = require("nodemailer");
const { EMAIL, MDP } = process.env;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL,
    pass: MDP,
  },
});
