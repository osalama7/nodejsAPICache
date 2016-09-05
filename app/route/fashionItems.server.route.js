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

	var memcache = require('memory-cache');
	var util = require('util');

	module.exports = function(app) {
	app.route('/fashionItems')
	.post(fashionItems.create);
	
	// app.get('/fashionCacheRandomStrings', cache('10 second'), function(req,res,next){
	// 	console.log("cache hit");
	// 	var rands = randomString();
	// 	app.route('/fashionItems')
	// 	.post(fashionItems.create);
		
	// 	res.send(rands);
	// });
	// app.get('/fashionCacheFoo', cache('10 seconds'), function(req,res,next){
	// 	console.log("cache hit");
	// 	res.send({foo:"bar"});

	// });

		//memory cache
		//end point to create a key for 10000 ms
	app.get('fashionItems/testingReq', function(req, res){
		memcache.put(req.body, randomString(), 10000 , function(key, value){
			console.log("a request containing  " +  key + " and " + value);
		});
	});


		//creates, and gets existing cache entries
	var i = 0;
	app.get('/fashionItems/testingmemcache', function(req, res) {

		console.log(req.body);
		if(memcache.get(req.body) == null){
			console.log("Cache miss");
			memcache.put(i, randomString(), 10000,function(key, value) {	
				console.log(key + '  something  ' + value);

			});
			//adding new item after expiry of ttl
			console.log("a new item is added after old item expiry");
			memcache.put(i+1, randomString(), 1000);
			var memsize = memcache.size();
			//check if memory cache entries is more than 5, replace first 3 elements in the cache
			if(memsize > 5){
				console.log("replacing old key");
				var keyarr = memcache.keys();
				for( var j = 0 ; j< 3; j++ ){
					memcache.put(j, randomString(), 10000);

				}
				
			}
			i++;
		}else if(memcache.get(req.body != null)){
			console.log("Cache hit");

			console.log(memcache.get(req.body));
		}
	console.log(memcache.keys());
		
	});
	//endpoint returns all stored keys
	app.get('/fashionItems/getcachedkeys', function(req, res) {
		var arr = memcache.keys();
		console.log("number of keys in cache " + arr.length);
		for(key in arr){
			console.log(key);
		}
	});
	//endpoint 	delete all stored keys
	app.get('/fashionItems/delcachedkeys', function(req, res) {
		var arr = memcache.keys();
		console.log("removing all keys in cache " + arr.length);
		for(key in arr){
			console.log(key + "removed");
			console.log(memcache.del(key));
		}
	});	
	//endpoint that deletes a given key
	app.get('/fashionItems/delakey', function(req, res) {
		 console.log("removing a keys from cache ");
		 console.log(memcache.del(req.body));
		
	});	



	// app.route('/fashionItems/clearCache'), cache('30 seconds'), function(req, res){
	// 	//todo problem with this endpoint
	// 	res.send(200, apicache.clear());
	// 	console.log('Cache Cleared');
	// };
	//todo these end points need to correspond to items in the cache
	app.route('/fashionItems/:fashionItemId')
	.get(fashionItems.read)
	.put(fashionItems.update)
	.delete(fashionItems.delete);
	
	app.param('fashionItemId', fashionItems.fashionItemByID);
};
