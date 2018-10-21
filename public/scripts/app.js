$(() => {
  // LOAD ALL RESOURCES ON HOMEPAGE
  if (top.location.pathname === '/') {
    $.ajax({
    method: "GET",
    url: "/api/homepage"
    }).done((resources) => {
      console.log(resources);
      for(resource of resources) {
      $(`<a href="/api/resources/${resource.id}"><div class="card card-pin"><img class="card-img" src="${resource.imgurl}"/><p>${resource.title}</p><p>${resource.description}</p><p>${resource.category}</p></div></a>`).prependTo($('.card-columns'));
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
          $(`<a href="/api/resources/${resource.id}"><div class="card card-pin"><img class="card__img" src="${item.imgurl}"/><p class="card__title">${item.title}</p><p class="card__description">${item.description}</p><p class="card__cat ${resource.category}">${item.category}</p></div></a>`).prependTo($('.card-columns'));
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
  // Login
    $('#addLoggedOut').on('click', (e) => {
    e.preventDefault();
    $('body').addClass('fixed');
    $('#loginModal').show();
    $('#overlay').show();
  })

  // Add New Resource
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
    $('#addResourceModal, #registerModal, #loginModal').hide();
  })

  $('.fa-times').on('click', function() {
    $('#overlay').hide();
    $('body').removeClass('fixed');
    $('#addResourceModal, #registerModal, #loginModal').hide();
  })

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
  //$('.card-columns .card__cat:contains("HTML")').closest('.card-pin').addClass('platinum')

  $("p.card__cat:contains('HTML')").parentsUntil("div").find("p").addClass("newClass");

  //$('.card__cat:contains("HTML")').addClass('NEWCLASS');

>>>>>>> 66738619dcb9ef5a69f991a59b061cea17e11f6c
=======
>>>>>>> users_dashboard
=======
>>>>>>> users_dashboard
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
        // console.log("we are in success!");
        // add success div notice
        let newPost = $(`<div class="card card-pin"><img class="card__img" src="${result.imgurl}"/><p class="card__title">${result.title}</p><textarea class="card__description">${result.description}</textarea><a href="${result.link}">${result.link}</a><p class="card__cat ${resource.category}">${result.category}</p></div>`);
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
    // console.log("before ajax request ",data);
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
        // console.log("test ",globalresourceId);
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
          $('#like_button').attr('value', result).text('Unlike');
        },
        error: function(error) {
          console.log("we are in error");
        }
      });

    } else if(currentText === "Unlike") {
      e.preventDefault();

      var data = {
        like_id: $('#like_button').attr('value')
      };

      // console.log("before delete ajax request", data);

      $.ajax({
        url: 'deletelike',
        data: data,
        type: 'POST',
        success: function(result) {
          // console.log('we have successfully removed your like');
          $('#like_button').attr('value',globalresourceId).text('Like');
        },
        error: function(error) {
          console.log("we are in error");
        }
      });
    }
  });
});
