// Added by Jesse Howard for the Auth Modal

//******** Initialize Firebase
var config = {
  apiKey: "AIzaSyDs-d89LsvmB0Tu4ShIFJsqQfgCquQixCU",
  authDomain: "mymemeauth.firebaseapp.com",
  databaseURL: "https://mymemeauth.firebaseio.com",
  projectId: "mymemeauth",
  storageBucket: "mymemeauth.appspot.com",
  messagingSenderId: "69938255659"
};
firebase.initializeApp(config);

//******** FirebaseUI
//To start the FirebaseUI sigin in, initialize the FirebaseUI instance
var ui = new firebaseui.auth.AuthUI(firebase.auth());

ui.start("#firebaseui-auth-container", {
  signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID]
  // Other config options...
});

// ******** Global Variables
var UID = "";

//******** Form functions:
/*** Handles the sign in button press.
 */
function toggleSignIn() {
  if (firebase.auth().currentUser) {
    // [START signout]
    firebase.auth().signOut();
    //update values when signed out...
    $("#quickstart-sign-up").attr({
      disabled: false
    });
    $("#quickstart-password-reset").attr({
      disabled: false
    });
    setWelcomeText("signedout");
    // [END signout]
  } else {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    if (email.length < 4) {
      alert("Please enter an email address.");
      return;
    }
    if (password.length < 4) {
      alert("Please enter a password.");
      return;
    }
    // Sign in with email and pass.
    // [START authwithemail]
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode === "auth/wrong-password") {
          alert("Wrong password.");
        } else {
          alert(errorMessage);
        }
        console.log(error);
        document.getElementById("quickstart-sign-in").disabled = false;
        // [END_EXCLUDE]
      });
    // [END authwithemail]
  }
  //disabled this step because we ALWAYS want this button to be clickable...
  //document.getElementById("quickstart-sign-in").disabled = true;
}

/**
 * Handles the sign up button press.
 */
function handleSignUp() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  if (email.length < 4) {
    alert("Please enter an email address.");
    return;
  }
  if (password.length < 4) {
    alert("Please enter a password.");
    return;
  }
  // Sign in with email and pass.
  // [START createwithemail]
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode === "auth/weak-password") {
        alert("The password is too weak.");
      } else {
        alert(errorMessage);
      }
      console.log(error);
      // [END_EXCLUDE]
    });
  // [END createwithemail]
}

/**
 * Sends an email verification to the user.
 */
function sendEmailVerification() {
  // [START sendemailverification]
  firebase
    .auth()
    .currentUser.sendEmailVerification()
    .then(function() {
      // Email Verification sent!
      // [START_EXCLUDE]
      alert("Email Verification Sent!");
      // [END_EXCLUDE]
    });
  // [END sendemailverification]
}

function sendPasswordReset() {
  var email = document.getElementById("email").value;
  // [START sendpasswordemail]
  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(function() {
      // Password Reset Email Sent!
      // [START_EXCLUDE]
      alert("Password Reset Email Sent!");
      // [END_EXCLUDE]
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode === "auth/invalid-email") {
        alert(errorMessage);
      } else if (errorCode === "auth/user-not-found") {
        alert(errorMessage);
      }
      console.log(error);
      // [END_EXCLUDE]
    });
  // [END sendpasswordemail];
}

/**
 * initApp handles setting up UI event listeners and registering Firebase auth listeners:
 *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
 *    out, and that is where we update the UI.
 */
function initApp() {
  // Listening for auth state changes.
  // [START authstatelistener]
  firebase.auth().onAuthStateChanged(function(user) {
    // [START_EXCLUDE silent]
    document.getElementById("quickstart-verify-email").disabled = true;
    // [END_EXCLUDE]
    if (user) {
      // User is signed in.
      UID = user.uid;
      console.log(UID);
      // var displayName = user.displayName;
      // var email = user.email;
      var emailVerified = user.emailVerified;
      // var photoURL = user.photoURL;
      // var isAnonymous = user.isAnonymous;
      // var uid = user.uid;
      // var providerData = user.providerData;
      // [START_EXCLUDE]
      //close modal ONLY if login is successful
      $("#authModal").modal("hide");
      $("#user-status").text(" Signed In");
      document.getElementById("quickstart-sign-in-status").textContent =
        "Signed In";
      document.getElementById("quickstart-sign-in").textContent = "Sign out";
      //This displays the whole user object as a JSON object, nice for testing but bad for
      //document.getElementById("quickstart-account-details").textContent = JSON.stringify(user, null, "  ");
      if (!emailVerified) {
        document.getElementById("quickstart-verify-email").disabled = false;
      }
      //added steps to disable un-necessary buttons while logged in
      $("#quickstart-sign-up").attr({
        disabled: true
      });
      $("#quickstart-password-reset").attr({
        disabled: true
      });
      // $("#welcome-account").html(
      //   "<p> You are currently logged in as: " + user.email + " </p>"
      // );
      // [END_EXCLUDE]
    } else {
      // User is signed out.
      // [START_EXCLUDE]
      $("#user-status").text(" Signed Out");
      document.getElementById("quickstart-sign-in-status").textContent =
        "Signed Out";
      document.getElementById("quickstart-sign-in").textContent = "Sign in";
      //added steps to INCLUDE sign-up and pw-reset buttons
      $("#quickstart-sign-up").attr({
        disabled: false
      });
      $("#quickstart-password-reset").attr({
        disabled: false
      });
      //update welcomeHTML text
      //setWelcomeText("signedOut");

      // [END_EXCLUDE]
    }
    // [START_EXCLUDE silent]
    document.getElementById("quickstart-sign-in").disabled = false;
    // [END_EXCLUDE]
  });
  // [END authstatelistener]
  document
    .getElementById("quickstart-sign-in")
    .addEventListener("click", toggleSignIn, false);
  document
    .getElementById("quickstart-sign-up")
    .addEventListener("click", handleSignUp, false);
  document
    .getElementById("quickstart-verify-email")
    .addEventListener("click", sendEmailVerification, false);
  document
    .getElementById("quickstart-password-reset")
    .addEventListener("click", sendPasswordReset, false);
}

function setWelcomeText(userStatus) {
  var welcomeHTML = "";
  if (userStatus === "signedin") {
    welcomeHTML =
      "<p>Enter an email and password below and either sign in to an existing account or sign up</p>";
    $("#welcome-account").html(welcomeHTML);
  }
}

window.onload = function() {
  initApp();
};

//Added this step, otherwise kept getting this error: Uncaught Error: Could not find the FirebaseUI widget element on the page.
//document.querySelector("#firebaseui-auth-container");
