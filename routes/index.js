var express = require('express'),
	router = express.Router();

var scrapeCtrl = require('../server/controllers/scrape');

router.get('/', function(req, res, next){    
    res.render('index', { title : 'Web scraper home page'});
}); 

router.get('/scrape', function(req, res, next){	
    res.render('scrape', { title : 'Web Scraper', subtitle: 'Scrape Linkedin profile and other web sites.', type : 'normal'});
});

router.get('/api/scrape', scrapeCtrl.getScrapeContent);

module.exports = router;


