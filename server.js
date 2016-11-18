var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles={
    
    'article-one':{
        'title': "Article One, vamsi",
        'date': '9 sep 12',
        'content':`<p>
                What the hell are you doing in this first one ??What the hell are you doing in this first one ??What the hell are you doing in this first one ??What the hell are you doing in this first one ??What the hell are you doing in this first one ??What the hell are you doing in this first one ??What the hell are you doing in this first one ??What the hell are you doing in this first one ??What the hell are you doing in this first one ??What the hell are you doing in this first one ??What the hell are you doing in this first one ??
            </p>
             <p>
                What the hell are you doing in this first one ??What the hell are you doing in this first one ??What the hell are you doing in this first one ??What the hell are you doing in this first one ??What the hell are you doing in this first one ??What the hell are you doing in this first one ??What the hell are you doing in this first one ??What the hell are you doing in this first one ??What the hell are you doing in this first one ??What the hell are you doing in this first one ??What the hell are you doing in this first one ??
            </p>`
    },
    'article-two':{
         'title': "Article Two, vamsi",
        'date': '19 sep 12',
        'content':`<p>
                2What the hell are you doing in this first one ??What the hell are you doing in this first one ??What the hell are you doing in this first one ??What the hell are you doing in this first one ??What the hell are you doing in this first one ??What the hell are you doing in this first one ??What the hell are you doing in this first one ??What the hell are you doing in this first one ??What the hell are you doing in this first one ??What the hell are you doing in this first one ??What the hell are you doing in this first one ??
            </p>
             <p>
                What the hell are you doing in this first one ??What the hell are you doing in this first one ??What the hell are you doing in this first one ??What the hell are you doing in this first one ??What the hell are you doing in this first one ??What the hell are you doing in this first one ??What the hell are you doing in this first one ??What the hell are you doing in this first one ??What the hell are you doing in this first one ??What the hell are you doing in this first one ??What the hell are you doing in this first one ??
            </p>`
    },
    'article-three':{
         'title': "Article Three, vamsi",
        'date': '29 sep 12',
        'content':`<p>
                3What the hell are you doing in this first one ??What the hell are you doing in this first one ??What the hell are you doing in this first one ??What the hell are you doing in this first one ??What the hell are you doing in this first one ??What the hell are you doing in this first one ??What the hell are you doing in this first one ??What the hell are you doing in this first one ??What the hell are you doing in this first one ??What the hell are you doing in this first one ??What the hell are you doing in this first one ??
            </p>
             <p>
                What the hell are you doing in this first one ??What the hell are you doing in this first one ??What the hell are you doing in this first one ??What the hell are you doing in this first one ??What the hell are you doing in this first one ??What the hell are you doing in this first one ??What the hell are you doing in this first one ??What the hell are you doing in this first one ??What the hell are you doing in this first one ??What the hell are you doing in this first one ??What the hell are you doing in this first one ??
            </p>`
    }
};


function createTemplate(data){
    var title = data.title;
    var date = data.date;
    var content = data.content;
    var htmlTemplate =`
    <html>
        <head>
            <title>
                ${title}
            </title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
        </head>
         <body>
             <div>
                 <a href="/">Home</a>
             </div>
            <hr> 
            <h3>
                  ${title}
            </h3>
            <h5>
                ${date}
            </h5>
            <div>
                ${content}
            </div>
          
         </body>
    </html>`;
    return htmlTemplate;
}

var counter=0;

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
 counter +=1;
});





var names=[];
app.get('/submit-name', function(req,res){ // /submit-name?name=
   var name = req.query.name;
    names.push(name);
    res.send(JSON.stringify(names));
});


var comments=[];
app.get('/comment-submit', function(req,res){ // /submit?name=
   var com = req.query.com;
    comments.push(com);
    res.send(JSON.stringify(comments));
});

app.get('/:articleName', function(req,res){
    var articleName = req.params.articleName;
   res.send(createTemplate(articles[articleName]));
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
