$(() => {
  // on load
  $.ajax({
    method: "GET",
    url: "/api/homepage"
  }).done((resources) => {
    for(resource of resources) {
      $("<a>").attr("href", `/api/resources/${resource.id}`).text(resource.title).appendTo($("body"));
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

});
