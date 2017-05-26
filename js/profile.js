(function localFileVideoPlayer() {
	'use strict'
  var URL = window.URL || window.webkitURL
  var displayMessage = function (message, isError) {
    var element = document.querySelector('#message')
    element.innerHTML = message
    element.className = isError ? 'error' : 'info'
  }
  var playSelectedFile = function (event) {
    var file = this.files[0]
    var type = file.type
    var videoNode = document.querySelector('video')
    // var canPlay = videoNode.canPlayType(type)
    // if (canPlay === '') canPlay = 'no'
    // var message = 'Can play type "' + type + '": ' + canPlay
    // var isError = canPlay === 'no'
    // displayMessage(message, isError)

    // if (isError) {
    //   return
    // }

    var fileURL = URL.createObjectURL(file)
    videoNode.src = fileURL
  }
  var inputNode = document.querySelector('input')
  inputNode.addEventListener('change', playSelectedFile, false)
})()

$('.message').hover(function(){
	$('.message-text').css('opacity',1);
},function(){
	$('.message-text').css('opacity',0)
})

$('.mid-left-btn').click(function(){
	$('.mid-left').animate({marginLeft:"0"},{duration:500,queue:false})
	$('.mid-right').animate({marginRight:"-100%"},{duration:100,queue:false})
	$('.mid-left-btn').animate({left:"100%"},{duration:500,queue:false})
	$('.mid-right-btn').animate({right:"0"},{duration:100,queue:false})
	// setTimeout(function(){$('.mid-right-btn').css('display','block')},1000)
	$('.mid-right-btn').delay(850).fadeIn("slow")
	setTimeout(function(){$('.mid-left-btn').css('display','none')},1000)

})
$('.mid-right-btn').click(function(){
	$('.mid-right-btn').animate({right:"100%"},{duration:100,queue:false})
	$('.mid-left-btn').animate({left:"0"},{duration:100,queue:false})
	$('.mid-right').animate({marginRight:"0"},{duration:500,queue:false})
	$('.mid-left').animate({marginLeft:"-100%"},{duration:100,queue:false})
	$('.mid-left-btn').delay(500).fadeIn("slow")
	setTimeout(function(){$('.mid-right-btn').css('display','none')},1000)
})
