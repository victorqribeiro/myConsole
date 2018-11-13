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
}
init();
