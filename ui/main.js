console.log('Loaded!');
var content = document.getElementById('content');
var madi = document.getElementById('madi');

content.innerHTML = "This is webappzz";
var marginLeft=0;
function move(){
    
   marginLeft= marginLeft + 3;
    madi.style.marginLeft = marginLeft + 'px';
}

madi.onclick = function (){
  //  madi.style.marginLeft = '100px';
   var interval=  setInterval(move,10);
}