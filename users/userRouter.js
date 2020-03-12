const express = require('express');

const router = express.Router();

const UserDb = require('./userDb');
const PostsDb = require('../posts/postDb');


router.post('/', validateUser, (req, res) => {
  // do your magic!
  UserDb.insert(req.body)
  .then (response=>{
    res.status(201).json(response)
    console.log(response,'res from post to /')
  })
  .catch(err=>({message:'server error'}))
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
  !req.body?res.status(400).json({message:'missing user data'}):!req.body.name?res.status(400).json({message:'missing name field'}):next()
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
