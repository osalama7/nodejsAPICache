///api/fashionItem


//developer comment: I have a problem understanding the flow of the router as required, 
//not sure of what should happen first, adding items that doesn't exist to the cache and mongodb
//or getting something that I know exist from the db and adding it to the cache ..!


//I'm stopping for a while for a break as results are not as I m expecting from this npm package, will 
//get back to the task in a couple of hours

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

	app.get('/fashionItems/fashionItemId', cache('30 seconds'), function(req, res, next) {
		if(res.status(404)){
	  		// do some work
	  		console.log("wahts going wrong");
			console.log(req.body.value);
	
			console.log("cache miss");
			var rands = randomString();
			req.apicacheGroup = rands;
			res.send(rands);
			app.post(fashionItems.createItem(rands));
		}
		console.log("cache hit");
		app.get(fashionItems.read(fashionItemId));
  			res.send({ foo: 'bar' });
	});

	app.route('/fashionItems/clearCache'), cache('30 seconds'), function(req, res){
		//todo problem with this endpoint
		res.send(200, apicache.clear());
		console.log('Cache Cleared');
	};
	//todo these end points need to correspond to items in the cache
	app.route('/fashionItems/:fashionItemId')
	.get(fashionItems.read)
	.put(fashionItems.update)
	.delete(fashionItems.delete);
	
	app.param('fashionItemId', fashionItems.fashionItemByID);
};
