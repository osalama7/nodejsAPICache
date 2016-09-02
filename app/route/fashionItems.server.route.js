///api/fashionItem


var fashionItems = require('../../app/controller/fashionItem.server.controller.js'),
	apicache = require('apicache').options({debug: true}),
	randomString = require('random-string'),
	cache = apicache.middleware;

	module.exports = function(app) {
	app.route('/fashionItems')
	.post(fashionItems.create);
	
	app.get('/fashionCacheRandomStrings', cache('10 second'), function(req,res,next){
		console.log("cache hit");
		var rands = randomString();
		app.route('/fashionItems')
		.post(fashionItems.create);
		
		res.send(rands);
	});
	app.get('/fashionCacheFoo', cache('10 seconds'), function(req,res,next){
		console.log("cache hit");
		res.send({foo:"bar"});

	});

	app.get('/fashionItems/:fashionItemId', cache('30 seconds', function(req,res,next){
		console.log(req.body.value);
		if(res.body=== undefined){
			console.log("cache miss");
			var rands = randomString();
			app.post(fashionItems.create(rands));
			res.send(rands);
		}
		console.log("cache hit");
		app.get(fashionItems.read(fashionItemId));
	}));


	app.route('/fashionItems/:fashionItemId')
	.get(fashionItems.read)
	.put(fashionItems.update)
	.delete(fashionItems.delete);
	
	app.param('fashionItemId', fashionItems.fashionItemByID);
};
