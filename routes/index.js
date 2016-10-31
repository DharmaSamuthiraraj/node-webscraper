var express = require('express'),
	router = express.Router();

var scrapeCtrl = require('../server/controllers/scrape');

router.get('/', function(req, res, next){    
    res.render('index', { title : 'Web scraper home page'});
}); 

router.get('/scrape', function(req, res, next){
    res.render('scrape', { title : 'Web scraper'});
});

router.get('/api/scrape', scrapeCtrl.getContent);

module.exports = router;


