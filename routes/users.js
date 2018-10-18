"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    console.log(req.params)
    knex
      .select("*")
      .from("resources")
      .then((results) => {
        res.json(results);
    });
  });

  router.get("/resources", (req, res) => {
    let searchKeyword = req.query.search
    knex
      .select("*")
      .from("resources")
      .where("title").like(`%${searchKeyword}%`)
      .or("description").like(`%${searchKeyword}%`)
      .or("link").link(`%${searchKeyword}%`)
      .then((results) => {
        res.json(results);
      });
  });

  return router;
}
