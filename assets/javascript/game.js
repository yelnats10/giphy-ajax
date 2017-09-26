$(document).ready(function() {
    console.log("ready!");

//creating variables to be used when performing searches and creating buttons
    var topics = ["dog", "cat", "rabbit"];  //an array to store user inputs
    var limit = 10;
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=";
    var apiKey = "&api_key=mUwe1Y3S6MMjW2SgOevoKu1X0uNVeEhR&limit=" + limit;

//function used to create buttons to load gifs
    function createButtons() {
        for (var i = 0; i < topics.length; i++) {
            var makeButton = $("<button type='button'>" + topics[i] + "</button>");
            makeButton.addClass("gif-button");
            $("#buttons").append(makeButton);
        }
    }

    createButtons();

//after the user inputs what they would like to search this will create that button
    $("#search-button").on("click", function(event) {
        event.preventDefault();
        var grabSearch = $("#search").val().trim();
        topics.push(grabSearch);
        $("#search").val("");
        $(".gif-button").remove();
        createButtons();
    });

//This section will perform the actual search within the giphy api when a button is pressed and load 10 gifs
    $("#buttons").on("click", ".gif-button", function() {
        var search = ($(this).text()); //grabs text of button to search
        console.log(search);
        $("img").remove();
        $("p").remove();

        for (var i = 0; i < limit; i++) {
            (function(i) {
                $.ajax({
                    url: queryURL + search + apiKey,
                    method: "GET"
                }).done(function(response) {
                    var getGif = response.data[i].images.downsized_still.url;
                    var rating = response.data[i].rating;
                    var contain = $("<div>");
                    var displayRating = $("<p>");
                    var displayGif = $('<img>');
                    contain.attr("id", "gif-" + i);
                    contain.addClass("gif-holder");
                    displayRating.text("Rating: " + rating);
                    displayGif.attr("src", getGif);
                    displayGif.addClass("newGif");
                    displayGif.attr("data-state", "still");
                    displayGif.attr("data-animate", response.data[i].images.downsized.url);
                    displayGif.attr("data-still", response.data[i].images.downsized_still.url);
                    $("#gifs").append(contain);
                    $("#gif-" + i).append(displayRating);
                    $("#gif-" + i).append(displayGif);
                });
            })(i);
        }
    });

//This section is used to start and stop the gif animation.
    $("#gifs").on("click", ".newGif", function() {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

});