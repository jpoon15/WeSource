$(() => {
  // LOAD ALL RESOURCES ON HOMEPAGE
  if (top.location.pathname === '/') {
    $.ajax({
    method: "GET",
    url: "/api/homepage"

  }).done((response) => {
    response.forEach(item => {
      $(`<a href="/api/resources/${item.resources_id}"><div class="card card-pin"><img class="card__img" src="${item.resources_imgurl}"/><p class="card__title">${item.resources_title}</p><p class="card__description">${item.resources_description}</p><p class="card__cat ${item.categories_category}">${item.categories_category}</p></div></a>`).prependTo($('.card-columns'));
    })
    });
  };
  //RATING BARS
  $(document).ready(function(){
  
    /* 1. Visualizing things on Hover - See next part for action on click */
    $('#stars li').on('mouseover', function(){
      var onStar = parseInt($(this).data('value'), 10); // The star currently mouse on
     
      // Now highlight all the stars that's not after the current hovered star
      $(this).parent().children('li.star').each(function(e){
        if (e < onStar) {
          $(this).addClass('hover');
        }
        else {
          $(this).removeClass('hover');
        }
      });
      
    }).on('mouseout', function(){
      $(this).parent().children('li.star').each(function(e){
        $(this).removeClass('hover');
      });
    });
    
    
    /* 2. Action to perform on click */
    $('#stars li').on('click', function(){
      var onStar = parseInt($(this).data('value'), 10); // The star currently selected
      var stars = $(this).parent().children('li.star');
      
      for (i = 0; i < stars.length; i++) {
        $(stars[i]).removeClass('selected');
      }
      
      for (i = 0; i < onStar; i++) {
        $(stars[i]).addClass('selected');
      }
      
      // JUST RESPONSE (Not needed)
      var ratingValue = parseInt($('#stars li.selected').last().data('value'), 10);
      var msg = "";
      if (ratingValue > 1) {
          msg = "Thanks! You rated this " + ratingValue + " stars.";
      }
      else {
          msg = "We will improve ourselves. You rated this " + ratingValue + " stars.";
      }
      responseMessage(msg);
      
    });
    
    
  });
  
  
  function responseMessage(msg) {
    $('.success-box').fadeIn(200);  
    $('.success-box div.text-message').html("<span>" + msg + "</span>");
  }

  // SEARCH BAR QUERY
  $("#searchButton").on("click", (e) => {
    e.preventDefault();
    let searchKeyword = $('#searchKeyword').val();
    $('.searchAlert').hide();

    if (!searchKeyword) {
      console.log("nothing to search!!!!!");
      $('.searchAlert').show();
      return;
    }

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
          $(`<a href="/api/resources/${item.resources_id}"><div class="card card-pin"><img class="card__img" src="${item.resources_imgurl}"/><p class="card__title">${item.resources_title}</p><p class="card__description">${item.resources_description}</p><p class="card__cat ${item.categories_category}">${item.categories_category}</p></div></a>`).prependTo($('.card-columns'));
        })
    },
      error: function(err){
        console.log("Search err", err);
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

//ADD NEW RESOURCE
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
        let newPost = $(`<div class="card card-pin"><img class="card__img" src="${result.imgurl}"/><p class="card__title">${result.title}</p><textarea class="card__description">${result.description}</textarea><a href="${result.link}">${result.link}</a><p class="card__cat ${result.category}">${result.category}</p></div>`);
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

