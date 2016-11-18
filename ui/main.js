console.log('Loaded!');
var content = document.getElementById('content');
var madi = document.getElementById('madi');

content.innerHTML = "This is webappz";

function move(){
    marginLeft
    madi.style.marginLleft = '100px';
}

madi.onClick = function (){
   var interval=  setInterval(move,500);
}