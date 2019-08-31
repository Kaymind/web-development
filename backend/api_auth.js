const express = require("express");
const router = express.Router();
const Users = require("./models/user_schema");
var bcrypt = require("bcryptjs");
const jwt = require('./jwt')

router.post("/login", async (req, res) => {
  let doc = await Users.findOne({ username: req.body.username });
  if (doc) {
    if (bcrypt.compareSync(req.body.password, doc.password)) {
        const payload = {
            id: doc._id,
            level: doc.level,
            username: doc.username
        };

        let token = jwt.sign(payload)
        res.json({ result: "ok", token , message: "Login successfully" });
    } else {
      // Invalid password
      res.json({ result: "nok", message: "Invalid password" });
    }
  } else {
    // Invalid username
    res.json({ result: "nok", message: "Invalid username" });
  }
});

router.post("/register", async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 8);
    let doc = await Users.create(req.body);
    res.json({ result: "ok", message: "Register successfully" });
  } catch (err) {
    res.json({ result: "nok", message: err.errmsg });
  }
});

module.exports = router;
