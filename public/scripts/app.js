$(() => {
  $.ajax({
    method: "GET",
    url: "/api/homepage"
  }).done((resources) => {
    for(resource of resources) {
      $("<a>").attr("href", `/api/resources/${resource.id}`).text(resource.title).appendTo($("body"));
    }
  });

});
