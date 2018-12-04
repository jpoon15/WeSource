"use strict";

let rp       = require('request-promise');
const cheerio   = require("cheerio");
const knex      = require('../lib/database-connection');

function createResource(data) {
    return rp(data)
    .then( (html) => {
        let $ = cheerio.load(html);
        return $('meta[property="og:image"]').attr('content');
    })
    .catch((err) => {
        console.log("err: ", err);
    })
}

module.exports = createResource

