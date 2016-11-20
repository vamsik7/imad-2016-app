window.onload = function() {
    
var currentArticleTitle = window.location.pathname.split('/')[2];


function loadComments () {
        // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            var comments = document.getElementById('comments');
            //console.log(request.responseText);
            if (request.status === 200) {
                var content = '';
               
                var commentsData = JSON.parse(this.responseText);
                for (var i=0; i< commentsData.length; i++) {
                    var time = new Date(commentsData[i].timestamp);
                    content += `<div class="comment">
                        <p>${escapeHTML(commentsData[i].comment)}</p>
                        <div class="commenter">
                          <strong> <em> ${commentsData[i].username}</em></strong> <h6> ${time.toLocaleTimeString()} on ${time.toLocaleDateString()}</h6> 
                        </div>
                        <hr/>
                    </div>`;
                }
                comments.innerHTML = content;
            } else {
                comments.innerHTML= '<p>Oops! Could not load comments!</p>';
            }
        }
    };
    
    request.open('GET', '/get-comments/' + currentArticleTitle, true);
   request.send(null);
}

function loadCommentForm () {
    var commentFormHtml = `
        
        <h4><span class="glyphicon glyphicon-comment"></span></h4>
        <textarea id="comment_text" rows="5" cols="110" placeholder="Enter your comment here..."></textarea>
        <br/><br/>
        <input type="submit" id="submit" value="Post" style="float:right;" />
        <br/>
        `;
     document.getElementById('comment_form').innerHTML = commentFormHtml;
    
    // Submit username/password to login
    var submit = document.getElementById('submit');
    submit.onclick = function () {
        // Create a request object
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
                // Take some action
                if (request.status === 200) {
                    // clear the form & reload all the comments
                    document.getElementById('comment_text').value = '';
                    loadComments();    
                    
                } else {
                    alert('Error: couldn\'t post. Login/Register to comment.');
                }
                submit.value = 'Submit';
          }
        };
        
        // Make the request
        var comment = document.getElementById('comment_text').value;
        request.open('POST', '/submit-comment/' + currentArticleTitle, true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({comment: comment}));  
        submit.value = 'Posting...';
        
    };
}


function loadLogin () {
    // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                loadCommentForm(this.responseText);
            }
        }
    };
    
    request.open('GET', '/check-login', true);
    request.send(null);
}


function escapeHTML (text)
{
    var $text = document.createTextNode(text);
    var $div = document.createElement('div');
    $div.appendChild($text);
    return $div.innerHTML;
}


function loadNavbar () {
        // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
           
            var navbar = document.getElementById('navbar');
            console.log(request.responseText);
            if (request.status === 200) {
                
                var content = '<ul><li><a href="/"><span class="glyphicon glyphicon-home"></span></a></li>';
                var navdata = JSON.parse(this.responseText);
                for (var i=0; i< navdata.length; i++) {
                    
                    content+=`<li>
                        <a href="">${navdata[i].name}</a>
                        </li>
                    `;
                    /*
                    content += `<li>
                    <a href="/articles/${articleData[i].title}">${articleData[i].heading}</a>
                    (${articleData[i].date.split('T')[0]})</li>`;*/
                }
                content += "</ul>";
                navbar.innerHTML = content;
            } else {
                navbar.innerHTML = 'Oops! Could not load the categories!';
            }
        }
    };
    
    request.open('GET', '/get-categories', true);
    request.send(null);
}

loadNavbar();

// The first thing to do is to check if the user is logged in!
loadLogin();
loadCommentForm();
loadComments();
 




 
    
};
 