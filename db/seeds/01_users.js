exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('users').insert(
      {id: 1,
       name: 'Alice',
       email: 'alice@email.com',
       password: 'password',
       aboutme: 'Front-End Dev hoping to be a full stack! I love to search the web and research new technology!',
       avatar: 'https://www.w3schools.com/howto/img_avatar2.png'
      }),
    knex('users').insert(
      {id: 2,
       name: 'Bob',
       email: 'bob@email.com',
       password: 'password',
       aboutme: 'An American painter, art instructor, and television host. Creator and host of The Joy of Painting, an instructional television program that aired from 1983 to 1994 on PBS in the United States',
       avatar: 'https://www.riinvest.net/wp-content/uploads/2018/02/MaleAvatar-1.png'
     }),
    knex('users').insert(
      {id: 3,
       name: 'Charlie',
       email: 'charlie@email.com',
       password: 'password',
       aboutme: 'Full time designer, with an interest in becoming a developer',
       avatar: 'https://www.w3schools.com/howto/img_avatar.png'
     })
  ])
  .then(() => {
    return knex.raw("SELECT setval('users_id_seq', COALESCE((SELECT MAX(id)+1 FROM users), 1), false);")
  })
  ;
};
