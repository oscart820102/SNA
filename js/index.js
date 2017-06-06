// Initialize Firebase
var config = {
  apiKey: "AIzaSyCjkfmg2MFFocIDBdQuplLOOflyD2roLQM",
  authDomain: "sna-final.firebaseapp.com",
  databaseURL: "https://sna-final.firebaseio.com",
  projectId: "sna-final",
  storageBucket: "sna-final.appspot.com",
  messagingSenderId: "296131393218"
};
firebase.initializeApp(config);

var db          = firebase.database() ;
var rootRef     = db.ref() ;
var usersRef    = db.ref("users");

// $(document).ready(function(){
//   firebase.auth().onAuthStateChanged(function(user) {
//     var vm=this;
//       if (user){
//         // save usr public data  (*1)
//         var userData = user.toJSON();
//         usersRef
//           .child (userData.uid)
//           .update(userData)
//           .catch(errorCallback)
//         // update vue to login status
//         vm.$set(vm.data, "currentUser" , userData )
//
//       }else{
//         // update vue to logout status
//         vm.$set(vm.data, "currentUser" ,null)
//
//       }
//     })
// })
//
var errorCallback = function(error){ alert(error.message)}

$('.log-in').click(function(){
  var provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(provider).catch(errorCallback);
  console.log("click login");
})
