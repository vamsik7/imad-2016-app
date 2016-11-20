
window.onload = function() {
 
 function loadLoginForm () {
     var loginHtml=`
        <div class="login_js">
        <h4>Login</h4>
        <input type="text" id="username" placeholder="username" name="firstname">
        <br/>
        <input type="password" id="password">
        <br/><br/>
        <input type="submit" id="login_btn" value="Login"/>
        <input type="submit" id="register_btn" value="Register" />
        </div>
     `;
     /*
    var loginHtml = `
        <h3>Login/Register to unlock awesome features</h3>
        <input type="text" id="username" placeholder="username" />
        <input type="password" id="password" />
        <br/><br/>
        <input type="submit" id="login_btn" value="Login" />
        <input type="submit" id="register_btn" value="Register" />
        `;
        */
    document.getElementById('login_area').innerHTML = loginHtml;
    
    // Submit username/password to login
    var submit = document.getElementById('login_btn');
    submit.onclick = function () {
        // Create a request object
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                  submit.value = 'Sucess!';
              } else if (request.status === 403) {
                  submit.value = 'Invalid credentials. Try again?';
              } else if (request.status === 500) {
                  alert('Something went wrong on the server');
                  submit.value = 'Login';
              } else {
                  alert('Something went wrong on the server');
                  submit.value = 'Login';
              }
              loadLogin();
          }  
          // Not done yet
        };
        
        // Make the request
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        console.log(username);
        console.log(password);
        request.open('POST', '/login', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: username, password: password}));  
        submit.value = 'Logging in...';
        
    };
    
    var register = document.getElementById('register_btn');
    register.onclick = function () {
        // Create a request object
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                  alert('User created successfully');
                  register.value = 'Registered!';
              } else {
                  alert('Could not register the user');
                  register.value = 'Register';
              }
          }
        };
        
        // Make the request
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        console.log(username);
        console.log(password);
        if(username =="" || password == ""){
            alert('Enter valid username and password !');
        }else{
        request.open('POST', '/create-user', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: username, password: password}));  
        register.value = 'Registering...';}
    
    };
}

function loadLoggedInUser (username) {
    var loginArea = document.getElementById('login_area');
    loginArea.innerHTML = `
        <h3> Hi <i>${username}</i></h3>
        <a href="/logout">Logout</a>
    `;
}

function loadLogin () {
    // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                loadLoggedInUser(this.responseText);
            } else {
                loadLoginForm();
            }
        }
    };
    
    request.open('GET', '/check-login', true);
    request.send(null);
}

function loadArticles () {
        // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            var articles = document.getElementById('articles');
            if (request.status === 200) {
                var content = '<ul>';
                var articleData = JSON.parse(this.responseText);
                for (var i=0; i< articleData.length; i++) {
                    
                    content+=`
                    <div id="short_article">
                        <h4><a href="/articles/${articleData[i].title}">${articleData[i].heading}</a></h4>
							<h5>(${articleData[i].date.split('T')[0]})</h5>
							<div>${(articleData[i].content).substr(0,200)}... <a id='rmlink' style='float:right;' href="/articles/${articleData[i].title}">Read More</a></div><br/><hr/>
                    </div>
                    `;
                    /*
                    content += `<li>
                    <a href="/articles/${articleData[i].title}">${articleData[i].heading}</a>
                    (${articleData[i].date.split('T')[0]})</li>`;*/
                }
                content += "</ul>";
                articles.innerHTML = content;
            } else {
                articles.innerHTML ='Oops! Could not load all articles!';
            }
        }
    };
    
    request.open('GET', '/get-articles', true);
    request.send(null);
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
                        <a href="/">${navdata[i].name}</a>
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

//loading the mav bar

loadNavbar();

// The first thing to do is to check if the user is logged in!
loadLogin();

// Now this is something that we could have directly done on the server-side using templating too!
loadArticles();


    

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