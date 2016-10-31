var request = require('request');
var cheerio = require('cheerio');


module.exports = {

	getContent: function(req, res, next) {	
		var url = req.query.url;		
		if(url != undefined && url != '') {
	        request(url, function(error, response, html){           
	            if(!error){       
	                var $ = cheerio.load(html, {
					    ignoreWhitespace: true,
					    xmlMode: true
					});	                  
	                res.send($('body').html()); 
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

	}

}