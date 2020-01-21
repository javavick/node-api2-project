const express = require("express");
const router = express.Router();
const Data = require("../data/db.js");

// POST ("/api/posts")
router.post("/", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  } else {
    Data.insert(req.body)
      .then((data) => {
        Data.findById(data.id)
          .then((post) => res.status(201).json(post))
          .catch(() =>
            res
              .status(500)
              .json({ error: "The post information could not be retrieved." })
          );
      })
      .catch(() =>
        res.status(500).json({
          error: "There was an error while saving the post to the database"
        })
      );
  }
});

// POST ("/api/posts/:id/comments")
router.post("/:id/comments", (req, res) => {});

module.exports = router;
