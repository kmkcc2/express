const express = require("express");

const router = express.Router();

router
  .route("/:id")
  .get((req, res) => {
    const id = req.params.id;
    res.send("User get " + id);
  })
  .put((req, res) => {
    const id = req.params.id;
    res.send("User put " + id);
  })
  .delete((req, res) => {
    const id = req.params.id;
    res.send("User delete  " + id);
  });

router.route("/").get((req, res) => {
  res.send("All users");
});

module.exports = router;
