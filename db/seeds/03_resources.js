
exports.seed = function(knex, Promise) {
  return Promise.all([
    // Inserts seed entries
    knex('resources').insert(
      {id: 1,
       title: 'Polygon',
       description: 'Polygon is an American video game website that publishes news, culture, reviews, and videos. At its October 2012 launch as Vox Medias third property, Polygon sought to distinguish itself from competitors by focusing on the stories of the people behind the games instead of the games themselves',
       link:'https://www.polygon.com/',
       category_id: 5,
       user_id: 1,
       imgurl: 'https://cdn1.vox-cdn.com/uploads/chorus_asset/file/8402075/941450_609208285758470_875871287_n.0.png',
       delete: 0}),
    knex('resources').insert(
      {id: 2,
       title: 'Experiments with Google',
       description:'Since 2009, coders have created thousands of amazing experiments using Chrome, Android, AI, Web VR, AR and more. We are showcasing projects here, along with helpful tools and resources, to inspire others to create new experiments. Here are collections of experiments to explore, with new ones added every week. Have fun.',
       link:'https://experiments.withgoogle.com/collection/chrome',
       category_id: 5,
       user_id: 2,
       imgurl: 'https://lh3.googleusercontent.com/FyZA5SbKPJA7Y3XCeb9-uGwow8pugxj77Z1xvs8vFS6EI3FABZDCDtA9ScqzHKjhU8av_Ck95ET-P_rPJCbC2v_OswCN8A=s688',
       delete: 0 }),
    knex('resources').insert(
      {id: 3,
        title: '99designs',
        description:'Get a custom design you’ll love with our global creative platform. 99designs is the best place to find and hire talented designers to grow your business.',
        link:'https://99designs.ca/blog/trends/web-design-trends-2018/',
        category_id: 8,
        user_id: 3,
        imgurl: 'https://images-workbench.99static.com/X01rl-BxkmbOQo3uQ2DIbT3Jwww=/0x0:1000x1000/fit-in/500x500/filters:fill(white,true):format(jpeg)/99designs-contests-attachments/66/66727/attachment_66727012',
        delete: 0 }),
    knex('resources').insert(
      {id: 4,
        title: 'UX Resources',
        description:'UX Booth. A publication consisting mostly of beginning-to-intermediate user experience and interaction designers. UX Collective. Our Medium publication with curated stories on user experience, usability, and product design. A List Apart.',
        link:'https://uxresources.design/',
        category_id: 8,
        user_id: 3,
        imgurl: "https://www.skuid.com/wp-content/uploads/2017/01/header-ux-resources.png",
        delete: 0 })
  ])
  .then(() => {
    return knex.raw("SELECT setval('resources_id_seq', COALESCE((SELECT MAX(id)+1 FROM resources), 1), false);")
  })
  ;
};
