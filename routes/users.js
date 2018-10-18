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

  router.get("/resources", (req, res) => {
    let searchKeyword = req.query.search
    console.log("search", req.query.search);
    /////

 //      knex("dept").where("deptno","50").del()
 // .then(function (count) {
 //   console.log(count);
 // })
 // .finally(function () {
 //   knex.destroy();
 // });



 ///Select query
 // knex.select("*").from("resources")
 // .where('title')
 // .then(function (depts){
 //   depts.forEach((dept)=>{ //use of Arrow Function
 //     console.log({...dept});
 //   });
 // }).catch(function(err) {
 // // All the error can be checked in this piece of code
 //   console.log(err);
 // }).finally(function() {
 //   // To close the connection pool
 //   knex.destroy();
 // });

    /////

    knex.select("*")
      .from("resources")
      .where("title", "like",`%${searchKeyword}%`)
      // .or("description","like",`%${searchKeyword}%`)
      // .or("link", "like",`%${searchKeyword}%`)
      .then((results) => {
        console.log("we are in the results section");
        res.json(results);
      });
  });

   //query.where('company', 'like', '%marker%');

  return router;
}
