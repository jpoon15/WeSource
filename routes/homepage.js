"use strict";

const express = require('express');
const router  = express.Router();
const knex    = require('../lib/database-connection');

module.exports = router;

//HOMEPAGE
router.get("/", (req, res) => {
  knex("resources")
    .where('delete', 0)
    .then((results) => {
      res.json(results);
  });
});

//SEARCH QUERY
router.get("/search", (req, res) => {
  let searchKeyword = (req.query.search).toLowerCase();
  console.log("search", req.query.search);

  knex.select("*")
    .from("resources")
    .where(
      knex.raw('LOWER("title") like ?',`%${searchKeyword}%`))
    .orWhere(
      knex.raw('LOWER("description") like ?',`%${searchKeyword}%`))
    .orWhere(
      knex.raw('LOWER("link") like ?', `%${searchKeyword}%`))
    .then((results) => {
      res.json(results);
    })

});
