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
          $(`<div class="card"><p>${item.title}</p><p>${item.description}</p><a href="${item.link}">${item.link}</a><p>${item.category_id}</p></div>`).prependTo($('.card-columns'));
        })
    },
      error: function(err){
        // do error stuff
      }
    });
  });



});
