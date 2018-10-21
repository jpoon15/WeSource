$(() => {
  // LOAD ALL RESOURCES ON HOMEPAGE
  if (top.location.pathname === '/') {
    $.ajax({
    method: "GET",
    url: "/api/homepage"
    }).done((resources) => {
      console.log(resources);
      for(resource of resources) {
      $(`<a href="/api/resources/${resource.id}"><div class="card card-pin"><img class="card-img" src="${resource.imgurl}"/><p>${resource.title}</p><p>${resource.description}</p><p>${resource.category_id}</p></div></a>`).prependTo($('.card-columns'));
    }
  });
  };

  // SEARCH BAR QUERY
  $("#searchButton").on("click", (e) => {
    e.preventDefault();
    let searchKeyword = $('#searchKeyword').val();
    $.ajax({
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
          $(`<a href="/api/resources/${resource.id}"><div class="card card-pin"><img class="card-img" src="${item.imgurl}"/><p>${item.title}</p><p>${item.description}</p><p>${item.category_id}</p></div></a>`).prependTo($('.card-columns'));
        })
    },
      error: function(err){
        console.log(err);
        // do error stuff
      }
    });
  });

//MODALS
  //ADD NEW RESOURCES
  $('#add').on('click', (e) => {
    e.preventDefault();
    $('body').addClass('fixed');
    $('#addResourceModal').show();
    $('#overlay').show();
  })

   //REGISTER USER
  $('#registerUser').on('click', (e) => {
    e.preventDefault();
    $('body').addClass('fixed');
    $('#registerModal').show();
    $('#overlay').show();
  })

  $('#overlay').on('click', function() {
    $(this).hide();
    $('body').removeClass('fixed');
    $('#addResourceModal, #registerModal').hide();
  })


//ADD NEW RESOUCE
  $('#addResource').on('click', (e) => {
    e.preventDefault();
    var category_id = $('#addResourceModal #category').find(':selected').val();

    var data  = {
      link: $('#url').val(),
      title: $('#title').val(),
      description: $('#description').val(),
      category_id: category_id
    };

    $.ajax({
      url: '/api/resources/add',
      data: data,
      type:'POST',
      success: function(result){
        console.log("we are in success!");
        // add success div notice
        let newPost = $(`<div class="card card-pin"><img class="card-img" src="${result.imgurl}"/><p>${result.title}</p><p>${result.description}</p><a href="${result.link}">${result.link}</a><p>${result.category_id}</p></div>`);
        $(newPost).prependTo($('.card-columns'))
        $('#overlay').hide();
        $('#addResourceModal').hide();
        location.reload();
      },
      error: function(error){
        console.log("we are in error :(");
      }
    });
  })

  // REGISTER NEW USER
  $('#register').on('click', (e) => {
      e.preventDefault();

      var register_id = $('#register').find(':selected').val();

      var data  = {
        email: $('#useremail').val(),
        username: $('#username').val(),
        password: $('#password').val(),
      };
      console.log("before ajax request ",data);
      $.ajax({
        url: '/api/users/register',
        data: data,
        type:'POST',
        success: function(result){
          console.log("we are in success");
          $('#overlay').hide();
          $('#registerModal').hide();
          $('.register_msg').show()
        },
        error: function(error){
          console.log("we are in error");
        }
      });
    })

  //LIKE AND UNLIKE FEATURE ON DETAIL PAGE
  var globalresourceId;

  $('#like_button').on('click', (e) => {
    e.preventDefault();

    var currentText = $('#like_button').text();

    if(currentText === "Like"){
        globalresourceId = $('#like_button').attr('value');
        console.log("test ",globalresourceId);
        //console.log(resourceId);
        var data = {
          resource_id: $('#like_button').attr('value')
        };

      $.ajax({
        url: 'like',
        data: data,
        type: 'POST',
        success: function(result) {
          // console.log('result', result)
          // console.log('we have successfully added to database');
          // $('#like_button').attr('class', 'delete_like').attr('value', result).text('Unlike');
          $('#like_button').attr('value', result).text('Unlike');
        },
        error: function(error) {
          console.log("we are in error");
        }
      });

    } else if(currentText === "Unlike"){
      e.preventDefault();

      var data = {
        like_id: $('#like_button').attr('value')
      };

      // console.log("before delete ajax request", data);

      $.ajax({
        url: 'delete',
        data: data,
        type: 'POST',
        success: function(result) {
          // console.log('we have successfully deleted to database');
          $('#like_button').attr('value',globalresourceId).text('Like');
        },
        error: function(error) {
          console.log("we are in error");
        }
      });
    }
  });

  //DELETE RESOURCES




});
