$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((resources) => {
    for(resource of resources) {
      $("<a>").attr("href", `/api/users/search/${resource.id}`).text(resource.title).appendTo($("body"));
    }
  });

});
