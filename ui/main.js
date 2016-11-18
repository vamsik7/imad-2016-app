window.onload = function(){ 
       
    console.log('Loaded!');
    
    
     var com = document.getElementById('submit-comment');
    com.onclick = function (){
        
        
        var request = new XMLHttpRequest();
        // getting back from the server
        
        request.onreadystatechange = function (){
            
            if(request.readyState === XMLHttpRequest.DONE){
                if(request.status === 200){
                    
                     
                    var comments = request.responseText;
                    comments = JSON.parse(comments);
                    var listz = '';
                    for(var i=0; i<comments.length; i++){
                         listz += '<p>' + comments[i] + '</p>';
                    }
                    var ulname = document.getElementById('comment-list');
                    ulname.innerHTML = listz;
                     console.log('some problem');
                }else{
                     console.log('some problem');
                 }
                    
                    /*
                    var comments = request.responseText;
                    comments = JSON.parse(comments);
                    var list ='';
                    for(var i=0;i<comments.length;i++){
                        list += '<p>'+ comments[i] + '</p>' ;
                    }
                    var comme = document.getElementById('comment-list');
                    comme.innerHTML = list;
                    console.log('I\'m here !');
                    for(var z=0;i<comments.length;z++){
                        console.log(comments[z]+'\n');
                    }
                    */
                   //console.log('some problem'); 
                
            }    
        };
        
        var comInput = document.getElementById('comment');
        var comIn = comInput.value;
        request.open('GET', 'http://vamsik7.imad.hasura-app.io/comment-submit/?comment='+ comIn, true);
        request.send(null);
        
    };
    
    var submit = document.getElementById('submit-btn');
    
    submit.onclick = function() {
        
        var request = new XMLHttpRequest();
        
        // responding after receiving from the server
        request.onreadystatechange = function(){
             
            if (request.readyState === XMLHttpRequest.DONE){
                if(request.status === 200){
                     // display in the html
                    
                    var names = request.responseText;
                    names = JSON.parse(names);
                    var list = '';
                    for(var i=0; i<names.length; i++){
                         list += '<li>' + names[i] + '</li>';
                    }
                    var ulname = document.getElementById('submit-list');
                    ulname.innerHTML = list;
                }else{
                     console.log('some problem');
                 }
                
            }
        };
        //make the request
        var nameInput = document.getElementById('name');
        var name= nameInput.value;
        request.open('GET','http://vamsik7.imad.hasura-app.io/submit-name/?name='+ name, true );
        request.send(null);
        
       
    };
    
    // comments related
    
    

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