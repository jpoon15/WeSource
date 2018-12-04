"use strict";

const express = require('express');
const router  = express.Router();
const knex    = require('../lib/database-connection');

module.exports = router;

//------------ HOMEPAGE ------------ //

router.get("/", (req, res) => {
  knex("resources")
    .where('delete', 0)
    .join("categories", "categories.id", "=", "resources.category_id")
    .select(
      "resources.id as resources_id",
      "resources.title as resources_title",
      "resources.link as resources_link",
      "resources.category_id as resources_category_id",
      "resources.user_id as resources_user_id",
      "resources.imgurl as resources_imgurl",
      "resources.description as resources_description",
      "categories.id as category_id",
      "categories.category as categories_category"
      )
    .then((results) => {
      res.json(results);
  });
});

//------------ SEARCH QUERY ------------ //

router.get("/search", (req, res) => {
  let searchKeyword = (req.query.search).toLowerCase();

  knex("resources")
      .where(
        knex.raw('LOWER("title") like ?',`%${searchKeyword}%`))
      .orWhere(
        knex.raw('LOWER("description") like ?',`%${searchKeyword}%`))
      .orWhere(
        knex.raw('LOWER("link") like ?', `%${searchKeyword}%`))
      .groupBy("resources.id", "categories.id")
      .having("delete", "=", 0)
      .join("categories", "categories.id", "=", "resources.category_id")
      .select(
        "resources.id as resources_id",
        "resources.title as resources_title",
        "resources.link as resources_link",
        "resources.category_id as resources_category_id",
        "resources.user_id as resources_user_id",
        "resources.imgurl as resources_imgurl",
        "resources.description as resources_description",
        "resources.delete as resources_delete",
        "categories.id as category_id",
        "categories.category as categories_category"
        )
      .then((results) => {
        console.log("filtered results", results)
        res.json(results);
      })
});
