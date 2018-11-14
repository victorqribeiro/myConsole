window.applicationCache.addEventListener('updateready', function(e) {
	if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
		window.applicationCache.swapCache();
		window.location.reload();
	}
}, false);

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
