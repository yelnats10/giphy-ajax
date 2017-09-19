$(document).ready(function() {
    console.log("ready!");
});

var topics = ["dog", "cat", "rabbit", "people"];
var limit = 10;

var queryURL = "https://api.giphy.com/v1/gifs/search?q=";
var apiKey = "&api_key=mUwe1Y3S6MMjW2SgOevoKu1X0uNVeEhR&limit=" + limit;


for (var i = 0; i < topics.length; i++){
	// var getGif = queryURL + topics[i] + apiKey;
	var makeButton = $("<button type='button'>" + topics[i] + "</button>");
	makeButton.addClass("gif-button");
	$("#buttons").append(makeButton);
};


// $.ajax({
//       url: queryURL + topics[0] + apiKey,
//       method: "GET"
//     }).done(function(response) {
//     	var getGif = response.data[0].images.downsized.url;
//     	var displayGif = $('<img>');
//     	displayGif.attr("src", getGif);
//     	$("#gifs").append(displayGif);

//     })


$(".gif-button").on("click", function(){
	var search = ($(this).text());	//grabs text of button to search
	console.log(search);
	$("img").remove();
	$("p").remove();

	for (var i = 0; i < limit; i++){

		(function(i){
			$.ajax({
		      url: queryURL + search + apiKey,
		      method: "GET"
		    }).done(function(response) {
		    	var getGif = response.data[i].images.downsized.url;
		    	var rating = response.data[i].rating;
		    	var displayRating = $("<p>");
		    	var displayGif = $('<img>');
		    	displayRating.text("Rating: " + rating);
		    	displayGif.attr("src", getGif);
		    	$("#gifs").append(displayRating);
		    	$("#gifs").append(displayGif);
		    });
		})(i);
	}


})