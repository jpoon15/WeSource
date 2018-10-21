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
        //console.log("img############; ", imgUrl);
       // var imageUrl = '../public/images/thumb.jpg'

        if (imgUrl === undefined || imgUrl === null) {
            console.log('#################### that image is undefined or null');

            imgUrl = 'http://localhost:8080/public/images/thumb.jpg';
        }
        return imgUrl;

    }).catch((err) => {
        console.log("err: ", err);
    })   
}

module.exports = createResource

