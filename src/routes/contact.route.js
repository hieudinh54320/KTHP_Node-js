const express = require("express");

const router = express.Router();

const verifyToken = require("../helpers/auth.middleware");

const contactController = require("../controllers/contact.controller");

router.get("/", verifyToken, contactController.index);

router.get("/create", verifyToken, contactController.showCreate);

router.post("/create", verifyToken, contactController.create);

router.get("/edit/:id", verifyToken, contactController.showEdit);

router.post("/edit/:id", verifyToken, contactController.update);

router.get("/delete/:id", verifyToken, contactController.remove);

module.exports = router;
