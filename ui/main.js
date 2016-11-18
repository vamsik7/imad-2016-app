console.log('Loaded!');
var content = document.getElementById('content');
var madi = document.getElementById('madi');

content.innerHTML = "This is webappz";

function move(){
    
    madi.style.marginleft = '100px';
}

madi.onClick = function (){
   var interval=  setInterval(move,500);
}