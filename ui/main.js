console.log('Loaded!');

var submit = document.getElementById('submit-btn');
submit.onclick = function (){
    // request the sever and get it back
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function(){
        
        if(request.readystatechange === XMLHttpRequest.DONE){
            if(request.readystatus === 200){
                 // display in the html
                
                var names = request.responseText;
                names = JSON.parse(names);
                var list = '';
                for(var i=0; i<names.length; i++){
                     list += '<li>' + names[i] + '</li>';
                }
                var ulname = document.getElementById('submit-list');
                ulname.innerHTML = list;
            }
            
        }else{
            
        }
    };
    var nameInput = document.getElementById('name');
    var name= nameInput.value;
    request.open('GET','http://vamsik7.imad.hasura-app.io/submit-name/name='+ name, true );
    request.send(null);
    
   
};
























/*var content = document.getElementById('content');
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
}*/