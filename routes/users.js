"use strict";

const express = require('express');
const router  = express.Router();

// function searchResourceFilter(keyword) {
//   knex.select("*")
//     .from("resources")
//     .where("title", "like",`%${keyword}%`)
//     .orWhere("description","like",`%${keyword}%`)
//     .orWhere("link", "like",`%${keyword}%`)
//     .then((results) => {
//       res.json(results);
//     })
// }

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("resources")
      .then((results) => {
        res.json(results);
    });
  });

  router.get("/search", (req, res) => {
    let searchKeyword = req.query.search;
    knex.select("*")
    .from("resources")
    .where("title", "like",`%${searchKeyword}%`)
    .orWhere("description","like",`%${searchKeyword}%`)
    .orWhere("link", "like",`%${searchKeyword}%`)
    .then((results) => {
      res.json(results);
    })
  });

  return router;
}
