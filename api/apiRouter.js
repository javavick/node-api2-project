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
router.post("/:id/comments", (req, res) => {
  Data.findById(req.params.id)
    .then(() => {
      if (!req.body.text) {
        res
          .status(400)
          .json({ errorMessage: "Please provide text for the comment." });
      } else {
        Data.insertComment(req.body)
          .then((object) => {
            Data.findCommentById(`${object.id}`)
              .then((comment) => res.status(201).json(comment))
              .catch(() =>
                res.status(500).json({
                  error: "The comment information could not be retrieved."
                })
              );
          })
          .catch(() =>
            res.status(500).json({
              error:
                "There was an error while saving the comment to the database"
            })
          );
      }
    })
    .catch(() =>
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." })
    );
});

// GET ("/api/posts")
router.get("/", (req, res) => {
  Data.find()
    .then((data) => res.status(200).json(data))
    .catch(() =>
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." })
    );
});

module.exports = router;
