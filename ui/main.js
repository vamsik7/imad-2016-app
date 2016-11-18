console.log('Loaded!');
var content = document.getElementById('content');
var madi = document.getElementById('madi');

content.innerHTML = "This is webappz";

function move(){
   
    madi.style.marginLeft = '100px';
}

madi.onClick = function (){
    madi.style.marginLeft = '100px';
  // var interval=  setInterval(move,500);
}