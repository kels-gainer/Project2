$(document).ready(function() {
  $(document).on("click", "#btnPop", function() {
    var queryURL =
      "http://version1.api.memegenerator.net//Instances_Select_ByPopular?languageCode=en&pageIndex=0&days=&apiKey=09011373-4c63-43a9-940b-c86724b46cd2";
    // Performing AJAX GET request
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After data comes back from the request
      .then(function(response) {
        // storing the data from the AJAX request in the results variable
        console.log(response);
        var results = response.result;
        console.log(results);
        //Looping over the data to grab displayName and instanceImageUrl
      });
  });
});
