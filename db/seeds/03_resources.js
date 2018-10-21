
exports.seed = function(knex, Promise) {
  return Promise.all([
    // Inserts seed entries
    knex('resources').insert({id: 1, title: 'Funny Cat meme', description: 'Cat fails', link:'http://www.google.com', category_id: 1, user_id: 1, imgurl: null }),
    knex('resources').insert({id: 2, title: 'Technology Rocks!', description:'21st century, ERA of Technology', link:'http://www.dribbble.com', category_id: 2, user_id: 2, imgurl: null }),
    knex('resources').insert({id: 3, title: 'Web-design fundamentals', description:'Important design fundamentals', link:'http://www.behance.com', category_id:3, user_id: 3, imgurl: null })
  ])
  .then(() => {
    return knex.raw("SELECT setval('resources_id_seq', COALESCE((SELECT MAX(id)+1 FROM resources), 1), false);")
  })
  ;
};
