var express = require('express');
var request = require('request');
var cheerio = require('cheerio');

var app = express();
var port = process.env.PORT || 3000;


app.get('/scrape', function(req, res, next){
    
    var url = req.query.url;   
    
    if(url != undefined && url != '') {
        request(url, function(error, response, html){
           
            if(!error){       
                var $ = cheerio.load(html, {
                    ignoreWhitespace: true,
                    xmlMode: false,
                    lowerCaseTags: false
                });
                var content = 'Output: <br><br>' + $('body').text();   
                res.send(content); 
                next();         
            } 
            else {
               res.send(error); 
               next();               
            }      

    	})	
    } 
    else {
        res.send('<b>Partial content: </b> May be url param is missing or url is null');
        next();     
    }  

});

app.listen(port, function() {	
  	console.log('Web Scraper app listening at ', port);
})

module.exports = app;