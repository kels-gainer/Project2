$(document).ready(function() {
  //Popular Button
  console.log("Loaded");
  $(document).on("click", "#btnPop", function() {
    $.ajax({
      url: "/api/btnPop",
      method: "GET"
    })
      // After data comes back from the request
      .then(function(response) {
        console.log(response);
        // storing the data from the AJAX request in the results variable
        var results = response;
        $(".memes-view").empty();
        //Looping over the data to grab displayName and instanceImageUrl
        $.each(results, function(index, item) {
          // console.log(index, item.displayName, item.instanceImageUrl);
          if (index <= 13) {
            var memeUrl = item.instanceImageUrl;
            var memeName = item.displayName;
            var memeDiv = $("<div>").addClass("col-md");
            // var p = $("<p>").text(memeName);
            var memeImage = $("<img class='meme'>");
            memeImage.attr("src", memeUrl).attr("title", memeName);
            // memeDiv.append(p);
            memeDiv.append(memeImage);
            $(".memes-view").prepend(memeDiv);
          }
        });
      });
  });
  //Recent Button is not working due to long API response time!
  // $(document).on("click", "#btnRec", function() {
  //   var queryURL =
  //     "http://version1.api.memegenerator.net//Instances_Select_ByNew?languageCode=en&pageIndex=0&apiKey=" +
  //     MemeKey;
  //   // Performing AJAX GET request
  //   $.ajax({
  //     url: queryURL,
  //     method: "GET"
  //   })
  //     // After data comes back from the request
  //     .then(function(response) {
  //       // storing the data from the AJAX request in the results variable
  //       var results = response.result;
  //       //Looping over the data to grab displayName and instanceImageUrl
  //       $.each(results, function(index, item) {
  //         // console.log(index, item.displayName, item.instanceImageUrl);
  //         if (index <= 13) {
  //           var memeUrl = item.instanceImageUrl;
  //           // var memeName = item.displayName;
  //           var memeDiv = $("<div>").addClass("col-md");
  //           // var p = $("<p>").text(memeName);
  //           var memeImage = $("<img class='meme'>");
  //           memeImage.attr("src", memeUrl);
  //           // memeDiv.append(p);
  //           memeDiv.append(memeImage);
  //           $(".memes-view").prepend(memeDiv);
  //         }
  //       });
  //     });
  // });
});
