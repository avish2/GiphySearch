 var topics = ["Dolphin", "Frog", "Turtle", "Dog", "Cat", "Narwhal", "Beach", "Mountains", "Resort", "Travel", "Luggage", "Dallas Buyers Club", "Interstellar", "Dazed and Confused", "True Detective", "Magic Mike"]
      ;
      // Re-renders the HTML to display the appropriate content
      function displayGifList() {

        var button = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + button + "&api_key=6b8dc1367fe7493ca974e1d0de84ff16&limit=10";

        // Creates AJAX call for the specific button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

            var results = response.data;

                for ( var i=0; i < results.length; i++) {
                    var imageDiv = $('<div>');
                    var imageView = results[i].images.fixed_height.url;
                    var still = results[i].images.fixed_height_still.url;
                        // console.log(imageView);  
                    var gifImage = $('<img>').attr("src", still).attr('data-animate', imageView).attr('data-still', still);
                    gifImage.attr('data-state', 'still');
                    $('#gifs-view').prepend(gifImage);
                    gifImage.on('click', playGif);
                    
                    // pulling the rating
                        var rating = results[i].rating;
                        var displayRated= $('<p>').text("Rating: " + rating);
                        $("#gifs-view").prepend(displayRated);
            
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
        renderButtons();
      });

      // Adding click event listeners to all elements with a class of "button"
      $(document).on("click", ".button", displayGifList());

      // Calling the renderButtons function to display the intial buttons
      renderButtons();