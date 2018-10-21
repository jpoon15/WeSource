
exports.seed = function(knex, Promise) {
  return Promise.all([
    // Inserts seed entries
    knex('categories').insert({id: 1, category: 'accessibility'}),
    knex('categories').insert({id: 2, category: 'animation'}),
    knex('categories').insert({id: 3, category: 'css'}),
    knex('categories').insert({id: 4, category: 'html'}),
    knex('categories').insert({id: 5, category: 'inspiration'}),
    knex('categories').insert({id: 6, category: 'javascript'}),
    knex('categories').insert({id: 7, category: 'plugins'}),
    knex('categories').insert({id: 8, category: 'ux'}),
    knex('categories').insert({id: 9, category: 'web'})
  ])
  .then(() => {
    return knex.raw("SELECT setval('categories_id_seq', COALESCE((SELECT MAX(id)+1 FROM categories), 1), false);")
  })
  ;
};
