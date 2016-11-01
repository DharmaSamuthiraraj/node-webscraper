'use strict';

var request = require('request');
var cheerio = require('cheerio');
var linkedinScraper = require('linkedin-scraper2');

module.exports = {

	getScrapeContent : function(req, res, next) {
		var url = req.query.url;	
		if(url != undefined && url != '') {
			var re = /linkedin.com/i;
			console.log('match: '+url.match(re));		
			if(url.match(re)) {
				getlinkedInProfile(url, function(err, data){
					if(err) {
					   	res.send(err); 
		                next();
					} 
					else {
						res.json(data); 
		                next();  
					}
				})
			} 
			else {
				getHTMLcontent(url, function(err, data){
					if(err) {
					   	res.send(err); 
		                next();
					} 
					else {
						res.send(data); 
		                next();  
					}
				})
			}        
	    } 
	    else {
	        res.send('<b>Partial content: </b> May be url param is missing or url is null');
	        next();     
	    }		
	}
	
}

var getHTMLcontent = function(url, callback) {
	request(url, function(error, response, html){           
        if(error){       
            callback(error, ''); 
                
        } else {
           var $ = cheerio.load(html, {
			    ignoreWhitespace: true,
			    xmlMode: true
			});	
			callback(error, $('body').html())                       
        }  

    })  
}

var getlinkedInProfile = function(url, callback) {
	linkedinScraper(url, function(err, profile) {
	    if (err) {
	       callback(err, {})
	    } else {
	    	callback(null, profile)	        
	    }
	});
}