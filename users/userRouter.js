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
});

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
  const id = req.params.id; // set id from request params to variable id
  console.log(req, "req from put");
  UserDb.update(id, { name: req.body.name }) //pass in id from request and the new object
    .then(response => {
      console.log(response, "first res in put promise");
      response === 1 //update function returns count of 1 in response if successful
        ? UserDb.getById(id)
            .then(response => {
              console.log(
                response,
                "res inside getuserid promise nested in put promise"
              );
              res.status(201).json(response);
            })
            .catch(error => {
              res.status(404).json({ message: "could not retrieve user id" });
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
  UserDb.getById(req.params.id) // get id in params from request
    .then(response2 => {
      console.log(response2, "res2");
      response2 // get the request associated with the targeted id , if its true
        ? (req.user = response2) // set req.user to the object in request
        : res.status(400).json({ error: "invalid id" }); //if there is no user object return error
      console.log(req.user, "req-user");
    })
    .catch(error => ({ error: "something went wrong" }));

  next();
}

function validateUser(req, res, next) {
  // do your magic!
  !req.body //if no request data
    ? res.status(400).json({ message: "missing user data" }) //return error
    : !req.body.name //if no name field exists or if text isnt entered into field
    ? res.status(400).json({ message: "missing name field" }) // return error
    : next(); // move on to next middleware or continue crud
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
