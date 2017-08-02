 var topics = ["Happy", "Sad", "No", "Yes", "Hysterical", "Love", "Hate", "Sob", "Retort", "Laugh Frown", "Sarcasm", "Not Funny", "Partay", "Dazed", "Hypnosis", "Crazy","Hero", "Villan", "Prince", "Princess", "Toy", "Play", "Dance","Sing"]
      ;
        console.log(topics);
      // displayMovieInfo function re-renders the HTML to display the appropriate content
      function displayGifList() {

        var button = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + button + "&api_key=6b8dc1367fe7493ca974e1d0de84ff16&limit=10&rating=pg&offset=4";

        // Creates AJAX call for the specific button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

            var results = response.data;
            $("#gifs-view").empty();

                for ( var i=0; i < results.length; i++) {
                    var imageDiv = $('<div>');
                    var imageView = results[i].images.fixed_height_small.url;
                    var still = results[i].images.fixed_height_small_still.url;
                        // console.log(imageView);  
                    var gifImage = $('<img>').attr("id", "gifthumb").attr("src", still).attr('data-animate', imageView).attr('data-still', still);
                    gifImage.attr('data-state', 'still');
                    $('#gifs-view').prepend("<div id='area'></div>");
                    $('#area').append(gifImage);
                    gifImage.on('click', playGif);
                    
                    // pulling the rating
                        var rating = results[i].rating;
                            // console.log(rating);
                        var displayRated= $('<p>').text("Rating: " + rating);
                        $('#area').prepend(displayRated);
                    // var a = $("#area").append("<a id='a'></a>");
                    // var span = $("<span>");
                    // $("#a").append(span);
                    // span.html("&#9658");
                    // span.addClass("play");
                    // a.on('click', playGif);
                } //for loop
          console.log(response);
        })

      };
      function playGif() { 
            var state = $(this).attr('data-state');
         if ( state == 'still'){
             $(this).attr('src', $(this).data('animate'));
              $(this).attr('data-state', 'animate');
         } else{
             $(this).attr('src', $(this).data('still'));
             $(this).attr('data-state', 'still');
            }

        } 

      // Function for displaying gif data
      function renderButtons() {

    
        $("#buttons-view").empty();
        // Loops through the array of topics
        for (var i = 0; i < topics.length; i++) {

        // Then dynamicaly generates buttons for each topic in the array
          var a = $("<button>");
          a.addClass("button");
          a.attr("data-name", topics[i]);
          a.text(topics[i]);
          $("#buttons-view").append(a);
        }
      }

      // This function handles events where the submit button is clicked
      $("#add-button").on("click", function(event) {
        event.preventDefault();
        var button = $("#gif-input").val().trim();
        topics.push(button);
        $("#gif-input").val("");
        renderButtons();
      });

      // Adding click event listeners to all elements with a class of "button"
      $(document).on("click", ".button", displayGifList);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();