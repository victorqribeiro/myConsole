window.addEventListener('load', function(e) {

  window.applicationCache.addEventListener('updateready', function(e) {
    if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
		  window.applicationCache.swapCache();
		  window.location.reload();
    }
  }, false);

}, false);


if('serviceWorker' in navigator) {
  navigator.serviceWorker
           .register('/myConsole/sw.js')
           .then(function() { });
}

// Code to handle install prompt on desktop

let deferredPrompt;
const addBtn = document.createElement('button');

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI to notify the user they can add to home screen
  addBtn.style.display = 'block';

  addBtn.addEventListener('click', (e) => {
    // hide our user interface that shows our A2HS button
    addBtn.style.display = 'none';
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {

        } else {

        }
        deferredPrompt = null;
      });
  });
});

function init(){
	let state = document.body.cloneNode(true);
	let myconsole = document.getElementById("myConsole");
	let main = document.getElementById("main");
	myconsole.addEventListener('change',function(){
		localStorage.setItem('tmp', this.value);
	});
	let tmp = localStorage.getItem('tmp');
	if(tmp){
		myconsole.value = tmp;
	}
	let result = document.getElementById("result");
	result.style.marginTop = main.offsetHeight + 'px';
	console.log = function(){
		for(let i = 0; i < arguments.length; i++){
			if( i != 0)
				result.innerHTML += ", ";
			result.innerHTML += arguments[i];
		}
		result.innerHTML += "<br>";
	};
	let clear = document.getElementById("clear");
	clear.addEventListener('click',()=>{
		myconsole.value = "";
		result.innerHTML = "";
		document.body = state;
		init();
	});
	let myConsole = document.getElementById("myConsole");
	let btn = document.getElementById("run");
	btn.addEventListener('click',()=>{
		try{
			eval( myConsole.value );
		}catch(e){
			result.innerHTML = e;
		}
		if(result.innerHTML)
			result.innerHTML += "<hr>";
	});
	window.URL = window.URL || window.webkitURL;
	let download = document.getElementById("download");
	download.addEventListener('click',()=>{
		let blob = new Blob([myconsole.value], {type: 'text/js'});
		let link = document.createElement('a');
		link.href = window.URL.createObjectURL(blob);
		link.download = 'script.js';
		link.click();
	});
}

init();
