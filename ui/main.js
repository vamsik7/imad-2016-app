console.log('Loaded!');

var madi = document.getElementById('madi');

function move(){
    
    madi.style.marginleft = '100px';
}

madi.onClick = function (){
   var interval=  setInterval(move,500);
}