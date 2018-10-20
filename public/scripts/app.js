$(() => {
  // ON LOAD
  $.ajax({
    method: "GET",
    url: "/api/homepage"
  }).done((resources) => {
    console.log(resources);
    for(resource of resources) {
      // $("<a>").attr("href", `/api/resources/${resource.id}`).text(resource.title).appendTo($("body"));
      //$(`<a href="/api/resources/${resource.id}"><div class="card card-pin"><img class="card-img" src="${resource.imgurl}"/><p>${resource.title}</p><p>${resource.description}</p><a href="${resource.link}">${resource.link}</a><p>${resource.category_id}</p></div></a>`).prependTo($('.card-columns'));
      $(`<a href="/api/resources/${resource.id}"><div class="card card-pin"><img class="card-img" src="${resource.imgurl}"/><p>${resource.title}</p><p>${resource.description}</p><p>${resource.category_id}</p></div></a>`).prependTo($('.card-columns'));
    }
  });

  // Search Bar Query
  $("#searchButton").on("click", (e) => {
    e.preventDefault();
    // set search query as let
    let searchKeyword = $('#searchKeyword').val();
    $.ajax({
      // route to GET from
      url: "/api/homepage/search",
      method: "GET",
      data: {
        search: searchKeyword
      },
      dataType: "json",
      success: function(response){
        $('.card-columns').empty();
        response.forEach(item => {
          console.log(item);
          $(`<div class="card card-pin"><img class="card-img" src="${item.imgurl}"/><p>${item.title}</p><p>${item.description}</p><a href="${item.link}">${item.link}</a><p>${item.category_id}</p></div>`).prependTo($('.card-columns'));
        })
    },
      error: function(err){
        console.log(err);
        // do error stuff
      }
    });
  });

  // Add New Resource
  $('#add').on('click', (e) => {
    e.preventDefault();
    $('body').addClass('fixed');
    $('#addResourceModal').show();
    $('#overlay').show();
  })

  $('#overlay').on('click', function() {
    $(this).hide();
    $('body').removeClass('fixed');
    $('#addResourceModal').hide();
  })

  // Comment Feed
//   function createCommentElements()

//   function renderComments(comments) {
//     $('#comment_feed').empty();
//     for (let i = 0; i < comments.length; i++) {
//       let $newComment = createCommentElement(comment[i]);
//       $('#comment-feed').append($newComment)
//     }
//   }

//   function loadComments() {
//     $.ajax('/api/resources/comment', {
//       method: 'GET',
//       success: function(comments) {
//         renderComments(comments)
//       }
//     })
//   }

// loadComments();

  $('#addResource').on('click', (e) => {
    e.preventDefault();

    var category_id = $('#addResourceModal #category').find(':selected').val();

    var data  = {
      link: $('#url').val(),
      title: $('#title').val(),
      description: $('#description').val(),
      category_id: category_id
    };
    //ajax call to save data
    console.log("before ajax request ",data);
    $.ajax({
      url: '/api/resources/add',
      data: data,
      type:'POST',
      success: function(result){
        console.log("we are in success");
        // add success div notice
        let newPost = $(`<div class="card card-pin"><img class="card-img" src="${result.imgurl}"/><p>${result.title}</p><p>${result.description}</p><a href="${result.link}">${result.link}</a><p>${result.category_id}</p></div>`);
        $(newPost).prependTo($('.card-columns'))
      },
      error: function(error){
        console.log("we are in error");
      }
    });
  })

//AJAX REQUEST: REGISTER
$('#register').on('click', (e) => {
    e.preventDefault();

    var register_id = $('#register').find(':selected').val();

    var data  = {
      username: $('#url').val(),
      email: $('#title').val(),
      password: $('#description').val(),
    };
    //ajax call to save data
    console.log("before ajax request ",data);
    $.ajax({
      url: '/api/users/register',
      data: data,
      type:'POST',
      success: function(result){
        console.log("we are in success");
        // add success div notice
        alert("You have successfully registered")
      },
      error: function(error){
        console.log("we are in error");
      }
    });
  })

//AJAX REQUEST: LIKING RESOURCE
$('#like_button').on('click', (e) => {
  e.preventDefault();
//Needs to change class so it's no longer a link

  var data = {
    resource_id: $('#like_button').attr('value')
  }
  console.log("before ajax request", data);

  $.ajax({
    url: 'like',
    data: data,
    type: 'POST',
    success: function(result) {
      console.log('we have successfully added to database');
    },
    error: function(error) {
      console.log("we are in error");
    }
  })
})


});
