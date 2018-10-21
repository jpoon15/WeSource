exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('users').insert({id: 1, name: 'Alice', email: 'alice@email.com', password: 'password'}),
    knex('users').insert({id: 2, name: 'Bob', email: 'bob@email.com', password: 'password'}),
    knex('users').insert({id: 3, name: 'Charlie', email: 'charlie@email.com', password: 'password'})
  ])
  .then(() => {
    return knex.raw("SELECT setval('users_id_seq', COALESCE((SELECT MAX(id)+1 FROM users), 1), false);")
  })
  ;
};
