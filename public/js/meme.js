$(document).ready(function() {
  //Favorite Button
  $(document).on("click", ".meme-favorite", function() {
    //Capture API values from the clicked button
    var displayName = $(this).attr("displayname");
    var instanceImageUrl = $(this).attr("instanceimageurl");
    var imageUrl = $(this).attr("imageurl");
    var text0 = $(this).attr("text0");
    var text1 = $(this).attr("text1");
    //placeholder for user uID
    var UID = "";
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        UID = user.uid;
      } else {
        // No user is signed in.
        UID = "NA";
      }
      //now we need to build the db object
      var obj = {
        uID: UID,
        displayName: displayName,
        instanceImageUrl: instanceImageUrl,
        imageUrl: imageUrl,
        text0: text0,
        text1: text1
      };
      //needs to trigger with the on 'click' event
      saveToDb(obj, UID);
    });
  });
  //Popular Button
  // console.log("Loaded");
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
        //updated to a function for re-usability
        displayMemes(results);
        // $(".memes-view").empty();
        // //Looping over the data to grab displayName and instanceImageUrl
        // $.each(results, function(index, item) {
        //   // console.log(index, item.displayName, item.instanceImageUrl);
        //   if (index <= 13) {
        //     var memeUrl = item.instanceImageUrl;
        //     var memeName = item.displayName;
        //     var memeDiv = $("<div>").addClass("col-md");
        //     // var p = $("<p>").text(memeName);
        //     var memeImage = $("<img class='meme'>");
        //     memeImage.attr("src", memeUrl).attr("title", memeName);
        //     var favButton = $("<button>").attr({
        //       class: "meme-favorite",
        //       displayName: memeName,
        //       instanceImageUrl: memeUrl,
        //       imageUrl: item.imageUrl,
        //       text0: item.text0,
        //       text1: item.text1
        //     });
        //     var itemDiv = $("<div>").html(memeImage);
        //     itemDiv.append(favButton);
        //     // memeDiv.append(p);
        //     memeDiv.append(itemDiv);
        //     $(".memes-view").prepend(memeDiv);
        //   }
        // });
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

function saveToDb(obj, uid) {
  //console.log(uid);
  if (uid === "NA") {
    alert("You need to create an account or sign in before favoriting a meme.");
  } else {
    console.log(obj);
    //alert(uid);
    //post to the mySQL database
    updateDb(obj);
  }
}

// Update the DB with a by clicking on a favorite meme
function updateDb(post) {
  $.ajax({
    method: "POST",
    url: "/api/posts",
    data: post
  }).then(function() {
    alert("Success");
  });
}

function displayMemes(results) {
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
      var favButton = $("<button>").attr({
        class: "meme-favorite",
        displayName: memeName,
        instanceImageUrl: memeUrl,
        imageUrl: item.imageUrl,
        text0: item.text0,
        text1: item.text1
      });
      var itemDiv = $("<div>").html(memeImage);
      itemDiv.append(favButton);
      // memeDiv.append(p);
      memeDiv.append(itemDiv);
      $(".memes-view").prepend(memeDiv);
    }
  });
}
