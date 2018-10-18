$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((resources) => {
    for(resource of resources) {
      $("<a>").attr("href", `/api/users/search/${resource.id}`).text(resource.title).appendTo($("body"));
    }
  });

  $("#searchButton").on("click", (e) => {
    e.preventDefault();

    
    let searchKeyword = $('#searchKeyword').val();
    //console.log("searchKeyword: ", searchKeyword);
    // we are go!
    $.ajax({
      url: "/api/users/search",
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
      // do successful stuff
      //console.log("response: ", response);
    },
      error: function(err){
        // do error stuff
      }
    });
  });


});
