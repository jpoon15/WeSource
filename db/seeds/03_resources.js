exports.seed = function(knex, Promise) {
  return Promise.all([
  // Inserts seed entries
  knex('resources').insert(
    { id: 1,
      title: 'Polygon',
      description: 'Polygon is an American video game website that publishes news, culture, reviews, and videos. At its October 2012 launch as Vox Medias third property, Polygon sought to distinguish itself from competitors by focusing on the stories of the people behind the games instead of the games themselves',
      link:'https://www.polygon.com/',
      category_id: 5,
      user_id: 1,
      imgurl: 'https://cdn1.vox-cdn.com/uploads/chorus_asset/file/8402075/941450_609208285758470_875871287_n.0.png',
      delete: 0 
    }),
  knex('resources').insert(
    { id: 2,
      title: 'Experiments with Google',
      description:'Since 2009, coders have created thousands of amazing experiments using Chrome, Android, AI, Web VR, AR and more. We are showcasing projects here, along with helpful tools and resources, to inspire others to create new experiments. Here are collections of experiments to explore, with new ones added every week. Have fun.',
      link:'https://experiments.withgoogle.com/collection/chrome',
      category_id: 5,
      user_id: 2,
      imgurl: 'https://lh3.googleusercontent.com/FyZA5SbKPJA7Y3XCeb9-uGwow8pugxj77Z1xvs8vFS6EI3FABZDCDtA9ScqzHKjhU8av_Ck95ET-P_rPJCbC2v_OswCN8A=s688',
      delete: 0 
    }),
  knex('resources').insert(
    { id: 3,
      title: '99designs',
      description:'Get a custom design you’ll love with our global creative platform. 99designs is the best place to find and hire talented designers to grow your business.',
      link:'https://99designs.ca/blog/trends/web-design-trends-2018/',
      category_id: 8,
      user_id: 3,
      imgurl: 'https://images-workbench.99static.com/X01rl-BxkmbOQo3uQ2DIbT3Jwww=/0x0:1000x1000/fit-in/500x500/filters:fill(white,true):format(jpeg)/99designs-contests-attachments/66/66727/attachment_66727012',
      delete: 0 
  }),
  knex('resources').insert(
    { id: 4,
      title: 'UX Resources',
      description:'UX Booth. A publication consisting mostly of beginning-to-intermediate user experience and interaction designers. UX Collective. Our Medium publication with curated stories on user experience, usability, and product design. A List Apart.',
      link:'https://uxresources.design/',
      category_id: 8,
      user_id: 3,
      imgurl: "https://www.skuid.com/wp-content/uploads/2017/01/header-ux-resources.png",
      delete: 0 
  }),
  knex('resources').insert(
    { id: 5,
      title: '20 ESSENTIAL CSS TRICKS EVERY DESIGNER SHOULD KNOW',
      description:'Learned how the box model works, and how to float those boxes. To that end, we’ve compiled a massive list of tips, tricks, techniques, and the occasional dirty hack to help you build the design you want.',
      link:'https://www.webdesignerdepot.com/2016/10/20-essential-css-tricks-every-designer-should-know/',
      category_id: 3,
      user_id: 1,
      imgurl: "https://www.webdesignerdepot.com/cdn-origin/uploads/2016/10/tricks-featured.jpg",
      delete: 0 }),
  knex('resources').insert(
    { id: 6,
      title: 'Clean Websites for inspiration',
      description:'Cleanness is essential for a good web design. People often mistake cleanness for minimalism. While both styles have common traits, do not be confused. They are not the same. Minimal design is more about using the bare essentials - less is more. Clean design focuses on the careful and precise positioning of the important elements throughout the site - a place for everything and everything in its place.',
      link:'https://www.awwwards.com/websites/clean/',
      category_id: 5,
      user_id: 3,
      imgurl: "https://www.awwwards.com/awards/images/2013/01/site-of-the-year-2012-blacknegative.jpg",
      delete: 0 }),
  knex('resources').insert(
    { id: 7,
      title: 'Creating interaction with Javascript',
      description:'UX Booth. A publication consisting mostly of beginning-to-intermediate user experience and interaction designers. UX Collective. Our Medium publication with curated stories on user experience, usability, and product design. A List Apart.',
      link:'https://scotch.io/tutorials/developing-a-creative-upload-interaction-with-javascript-and-canvas',
      category_id: 6,
      user_id: 1,
      imgurl: "https://scotch-res.cloudinary.com/image/upload/dpr_2,w_850,q_auto:good,f_auto/media/12350/udqENdsFQfCuez7Kogk3_creative-upload.png.jpg",
      delete: 0 }),
  knex('resources').insert(
    { id: 8,
      title: '9 Reasons Every Professional Should Know a Little HTML and CSS',
      description:'Importance of knowing HTML and CSS,And learning tech isn’t just for the production assistants and print designers of the world—whether you’re a small business owner, a sales manager, an event coordinator, or even a magician, you can benefit from some HTML and CSS chops. ',
      link:'https://www.themuse.com/advice/9-reasons-every-professional-should-know-a-little-html-and-css',
      category_id: 4,
      user_id: 3,
      imgurl: "https://pilbox.themuse.com/image.jpg?url=https%3A%2F%2Fassets.themuse.com%2Fuploaded%2Fattachments%2F15357.jpg%3Fv%3Da7db4353331fd8d3063be1f8d4540d7073a56dfaa5f825388865da43e8711861&h=367&prog=1",
      delete: 0 }),
  knex('resources').insert(
    { id: 9,
      title: 'Jquery Bar Rating',
      description:'Using simple Jquery plugin to implement various styles of rating widgets',
      link:'http://antenna.io/demo/jquery-bar-rating/examples/',
      category_id: 7,
      user_id: 1,
      imgurl: "https://bashooka.com/wp-content/uploads/2015/10/bar-star-rating-1.jpg",
      delete: 0 })
  ])
  .then(() => {
    return knex.raw("SELECT setval('resources_id_seq', COALESCE((SELECT MAX(id)+1 FROM resources), 1), false);")
  });
};