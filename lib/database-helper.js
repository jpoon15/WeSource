"use strict";

let rp       = require('request-promise');
const cheerio   = require("cheerio");
const knex      = require('../lib/database-connection');

function createResource(data) {
    // console.log("WE ARE IN CREATERESOURCE");
    // console.log("data: ", data);
    return rp(data)
    .then( (html) => {
        let $ = cheerio.load(html);
        return $('meta[property="og:image"]').attr('content');
    })
    .then( (imgUrl) => {
        //console.log("img ", imgUrl);
        return imgUrl;

    }).catch((err) => {
        console.log("err: ", err);
    })   
}

module.exports = createResource

