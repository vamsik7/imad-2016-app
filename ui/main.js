console.log('Loaded!');
var content = document.getElementById('content');
var madi = document.getElementById('madi');

content.innerHTML = "This is webappzz";

function move(){
   marginLeft= marginLeft + 10;
    madi.style.marginLeft = marginLeft + 'px';
}

madi.onclick = function (){
  //  madi.style.marginLeft = '100px';
   var interval=  setInterval(move,50);
}