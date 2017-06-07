var config = {
  apiKey: "AIzaSyCjkfmg2MFFocIDBdQuplLOOflyD2roLQM",
  authDomain: "sna-final.firebaseapp.com",
  databaseURL: "https://sna-final.firebaseio.com",
  projectId: "sna-final",
  storageBucket: "sna-final.appspot.com",
  messagingSenderId: "296131393218"
};
firebase.initializeApp(config);

var provider    = new firebase.auth.FacebookAuthProvider();
var db          = firebase.database() ;
var rootRef     = db.ref() ;
var usersRef    = db.ref("users");
var articlesRef = db.ref("articles");
var currentUser

firebase.auth().onAuthStateChanged(function (user) {
  if(user){
    currentUser = user;
    console.log(currentUser.uid);
  }else{
    alert("您尚未登入")
  }
});

var app = new Vue({
  el :'#app',
  data :{
    skill_list :{},
    suggest_list :{},
    favorite_list : {},
    control:{
      tab : "all",
      filter : "",
      sort : ""
    }
  },
  methods :{
    articleModal :function(){
      $('#publishArticle').modal('show')
    },
    articleSubmit :function(){
      var dataArr = $("#articleForm").serializeArray();
      var newPostKey = firebase.database().ref().child('articles').push().key;
      // Write the new post's data simultaneously in the posts list and the user's post list.
      var postData = {
        uid :currentUser.uid,
        aid :newPostKey,
        title :dataArr[0].value,
        change :dataArr[1].value,
        learn :dataArr[2].value,
        content :dataArr[3].value.replace(" ","<br />"),
        time :new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate()+' '+new Date().getHours()+':'+new Date().getMinutes(),
        changed :false
      }
      var updates = {};
      updates['/articles/' + newPostKey] = postData;
      //updates['/user-articles/' + currentUser.uid + '/' + newPostKey] = postData;

      return firebase.database().ref().update(updates);
    },
    toggle_like :function(aid){
      var favorite = {}
      favorite[aid] =true
      usersRef.child(currentUser.uid).child("favorite").child(aid).once('value',function(data){
        if(data.val()){
          usersRef.child(currentUser.uid).child("favorite").child(aid).remove()
        }else{
          usersRef.child(currentUser.uid).child("favorite").update(favorite)
        }
       })
    },
    favorite :function(aid){
      var result =[];
      usersRef.child(currentUser.uid).child("favorite").child(aid).on('value',function(data){
        console.log(data.val())
        if(data.val()){
          result=['favorite']
        }else{
          result = [""]
        }
      })
      return result
    },
    current_skill_list :function(){
      var vm=this
      var current = []
      switch (vm.control.tab) {
        case "all" :
          current = vm.skill_list
          break
        case "star" :
          current = vm.articles.filter(function(a){
            return vm.favorite[a.uid]
          })
      }
    }
  },
  computed :{

  },
  created :function(){
    var vm=this;
      articlesRef.once('value',function(data){
        var allArticles = data.val()
        vm.skill_list = allArticles
      })
  }
})
