"use strict";

const express = require('express');
const router  = express.Router();

function searchResourceFilter(keyword) {
  knex.select("*")
    .from("resources")
    .where("title", "like",`%${keyword}%`)
    .orWhere("description","like",`%${keyword}%`)
    .orWhere("link", "like",`%${keyword}%`)
    .then((results) => {
      res.json(results);
    })
}

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
    console.log("search", req.query.search);
    searchResourceFilter(searchKeyword);
    res.redirect("/");
  });

  return router;
}
