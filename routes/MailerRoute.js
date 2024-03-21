const express = require("express");
const router = express.Router();

router.post("/send-email", (req, res) => {
  const { name, email, subject, message } = req.body;

  const mailOptions = {
    from: email,
    to: "christmb017@gmail.com",
    subject: subject,
    text: `Nom: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Erreur lors de l'envoi de l'email");
    } else {
      console.log("Email envoyé: " + info.response);
      res.status(200).send("Email envoyé avec succès");
    }
  });
});

module.exports = router;
