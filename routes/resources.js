"use strict";

const express = require('express');
const router  = express.Router();
const knex    = require('../lib/database-connection');

module.exports = router;

router.get("/:id", (req, res) => {
  res.render("detail");

});

router.get("/search", (req, res) => {
  let searchKeyword = lowercase(req.query.search);
  console.log("search", req.query.search);

  knex.select("*")
    .from("resources")
    .where("title", "like",`%${searchKeyword}%`)
    .orWhere("description","like",`%${searchKeyword}%`)
    .orWhere("link", "like",`%${searchKeyword}%`)
    .then((results) => {
      res.json(results);
    })
    res.redirect("/")
});
