
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('resources').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('resources').insert({title: 'Funny Cat meme', description: 'Cat fails', link:'http://www.google.com', category_id: 1, user_id:1 }),
        knex('resources').insert({title: 'Technology Rocks!', description:'21st century, ERA of Technology', link:'http://www.dribbble.com', category_id: 2, user_id: 2 }),
        knex('resources').insert({title: 'Web-design fundamentals', description:'Important design fundamentals', link:'http://www.behance.com', category_id:3, user_id: 3 })
      ]);
    });
};
