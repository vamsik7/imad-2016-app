var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
    user: "vamsik7",
    database: "vamsik7",
    host: "db.imad.hasura-app.io",
    password: process.env.DB_PASSWORD,
    port:'5432' 
    
}; 

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
    var category = data.category;
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
                ${category}
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

// test db
var pool = new Pool(config);
app.get('/testdb',function(req,res){
    
    pool.query('select * from article', function(err, result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            res.send(JSON.stringify(result.rows));
        }
    });
});

var comments=[];
app.get('/comment-submit', function(req,res){ // /submit?name=
   var com = req.query.comment;
    comments.push(com);
    res.send(JSON.stringify(comments));
});


var names=[];
app.get('/submit-name', function(req,res){ // /submit-name?name=
   var name = req.query.name;
    names.push(name);
    res.send(JSON.stringify(names));
});




app.get('/articles/:articleName', function(req,res){
    //var articleName = req.params.articleName;
    pool.query('select * from article where title=$1',[req.params.articleName], function(err, result){
       if(err){
           res.status(500).send(err.toString());
       }else{
           if(result.rows.length===0){
               res.status(404).send('Article Not Found');
           }else{
               var articleData = result.rows[0];
               res.send(createTemplate(articleData));
           }
       }
        
    });
    
   
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
