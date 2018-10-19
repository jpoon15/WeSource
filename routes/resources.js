"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/:id", (req, res) => {
    res.render("detail_page");

  });

  router.get("/search", (req, res) => {
    let searchKeyword = req.query.search;
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

  return router;
}

  router.get("/new", (req, res) => {
    res.render("detail_page");

  });

  router.get("/search", (req, res) => {
    let searchKeyword = req.query.search;
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
