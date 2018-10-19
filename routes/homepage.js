"use strict";

const express = require('express');
const router  = express.Router();

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
    });
  });

  return router;
}
