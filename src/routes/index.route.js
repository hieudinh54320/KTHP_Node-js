const express = require("express");

const router = express.Router();

router.use("/", require("./auth.route"));

router.use("/contacts", require("./contact.route"));

router.get("/", (req, res) => {
  res.redirect("/login");
});

module.exports = router;
