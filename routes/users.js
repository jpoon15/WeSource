"use strict";

const express = require('express');
const router  = express.Router();
const knex    = require('../lib/database-connection');

module.exports = router;

router.get("/:id", (req, res) => {
      knex
      .select("*")
      .from("resources")
      .join('categories', 'resources.category_id', '=', 'categories.id')
      .select('resources')
      .where({user_id: '1'})
      .then((results) => {
        console.log(results);
        let templateVars= {articles: results}
        res.render("mydashboard", templateVars);
      });
  res.render("mydashboard");
});

router.get("/:id/profile", (req, res) => {
  res.render("profile");
});
