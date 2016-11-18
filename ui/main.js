console.log('Loaded!');

var madi = document.getElementById('madi');

function move(){
    
    madi.style.marginleft = '100px';
}

madi.onClick = function (){
    setInterval(move,500);
}