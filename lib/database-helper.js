"use strict";

let rp       = require('request-promise');
const cheerio   = require("cheerio");
const knex      = require('../lib/database-connection');


function createResource(data) {

    return rp(data.link)
    .then( (html) => {
        let $ = cheerio.load(html);
        //console.log($);
        // add fallbacks for any missing meta tags
        
        if (!$('meta[property="og:image"]')) {
            return $('meta[property="twitter:image"]').attr('content');
        } else if (!$('meta[property="twitter:image"]')) {
            return // custom image
        }
        return $('meta[property="og:image"]').attr('content');
    })
    .then( (imgUrl) => {
        console.log("img ", imgUrl);
        // add image to data via data.imageUrl = whatever...
        return knex('resources').insert(data).returning('id');
    })    
}

module.exports = {createResource}

let textImage = 'https://cdn-images-1.medium.com/max/1200/1*F52rOEHSLnSSfD3w1Z6XdA.jpeg';

createResource({title: 'Funny Cat meme', description: 'Cat fails', link:'https://medium.com/s/powertrip/how-tech-empowers-dangerous-lone-wolves-50fa0365335', category_id: 1, user_id:1 })
.then((id) => {
    console.log('HERE IS THE ', id);
});

