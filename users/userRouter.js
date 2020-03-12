const express = require("express");

const router = express.Router();

const UserDb = require("./userDb");
const PostsDb = require("../posts/postDb");

router.post("/", validateUser, (req, res) => {
  // do your magic!
  UserDb.insert(req.body)
    .then(response => {
      res.status(201).json(response);
      console.log(response, "res from post to /");
    })
    .catch(err => ({ message: "server error" }));
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  // do your magic!
  const userPost = req.body;
  console.log(userPost, "req user in post");

  PostsDb.insert(userPost)
    .then(response => {
      console.log(response);
      res.status(201).json(response);
    })
    .catch(err => {
      res.status(500).json({ error: "server error" });
    });
}); //find bug============================================================

router.get("/", (req, res) => {
  // do your magic!
  UserDb.get()
    .then(response => {
      res.status(201).json(response);
    })
    .catch(error => {
      res.status(500).json({
        message: "if you get this one wrong delete vs code from your machine"
      });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  // do your magic!
  UserDb.getById(req.params.id)
    .then(response => {
      res.status(201).json(response);
    })
    .catch(err => {
      res.status(500).json({ error: "server error" });
    });
});

router.get("/:id/posts", validateUserId, (req, res) => {
  // do your magic!
  UserDb.getUserPosts(req.params.id)
    .then(response => {
      response
        ? res.status(201).json(response)
        : res.status(500).json({ message: "error retrieving posts" });
    })
    .catch(error => {
      res.status(500).json({ message: "server error" });
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  // do your magic!
  UserDb.remove(req.params.id)
    .then(response => {
      res.status(201).json({ message: "removed from database" });
    })
    .catch(error => {
      res.status(500).json({ message: "server error" });
    });
});

router.put("/:id", validateUserId, (req, res) => {
  // do your magic!
  const id = req.params.id;
  console.log(req, "req from put");
  UserDb.update(id, { name: req.body.name })
    .then(response => {
      console.log(response, "first res in put promise");
      response === 1
        ? UserDb.getById(id).then(response => {
            console.log(
              response,
              "res inside getuserid promise nested in put promise"
            );
            res
              .status(201)
              .json(response)
              .catch(error => {
                res.status(404).json({ message: "could not retrieve user id" });
              });
          })
        : res.status(500).json({ message: "server error" });
    })
    .catch(error => {
      res.status(500).json({ message: "server error" });
    });
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  UserDb.getById(req.params.id)
    .then(response2 => {
      console.log(response2, "res2");
      response2
        ? (req.user = response2)
        : res.status(400).json({ error: "invalid id" });
      console.log(req.user, "req-user");
    })
    .catch(error => ({ error: "something went wrong" }));

  next();
}

function validateUser(req, res, next) {
  // do your magic!
  !req.body
    ? res.status(400).json({ message: "missing user data" })
    : !req.body.name
    ? res.status(400).json({ message: "missing name field" })
    : next();
}

function validatePost(req, res, next) {
  // do your magic!
  !req.body
    ? res.status(400).json({ message: "missing post data" })
    : !req.body.text
    ? res.status(400).json({ message: "missing required text field" })
    : next();
}

module.exports = router;
