var mongoose = require('mongoose'),
	FashionItem = mongoose.model('FashionItem');

var getErrorMessage = function (err) {
	if(err.errors){
		for(var errName in err.erros){
			if(err.errrs[errName].message) return err.errors[errName].message;
		}
	}else{
		return 'UKNOWN SERVER ERROR';
	}
};

//create a anew FashionItem
exports.createItem = function(res, item){
var fashionItem = new FashionItem(item);
		fashionItem.save(function(err){
			if(err){
				return res.status(400).send({
					message: getErrorMessage(err)
				}); 
			}else{
				res.json(fashionItem);
				console.log("Fashion Item " + fashionItem._id + " created");
			}
		});
};

exports.create = function(req, res){
var fashionItem = new FashionItem(req.body);
		fashionItem.save(function(err){
			if(err){
				return res.status(400).send({
					message: getErrorMessage(err)
				}); 
			}else{
				res.json(fashionItem);
				console.log("Fashion Item " + fashionItem._id + " created");
			}
		});
};
//get on fashion Item by ID
exports.fashionItemByID = function(req, res, next, id){
	FashionItem.findById(id)
		.populate('_id','name')
		.exec(function(err, fashionItem){
	 	if(err) return next(err);
	 	if(!fashionItem) return next(new Error('Unable to find fashionItem ' + id));
	 	req.fashionItem = fashionItem;
	 	console.log("Fashion Item " + fashionItem._id + " Found");
	 	next();
	 });
};
//read fashion item JSON
exports.read =function(req, res){
	res.json(req.fashionItem);
};
//update fashion item
exports.update = function(req, res){
	var fashionItem = req.fashionItem;
	fashionItem.name = req.body.name;
	fashionItem.save(function(err){
		if(err){
			return res.status(400).send({
				message: gotErrorMessage(err)
			});
		}else{
			res.json(fashionItem);
			console.log("Fashion Item " + fashionItem._id + " updated");
		}
	});
};
//delete fashion item
exports.delete = function(req, res){
	var fashionItem = req.fashionItem;

	fashionItem.remove(function(err){
		if(err){
			return res.status(400).send({
				message: gotErrorMessage(err)
			});
		}else{
			console.log("Fashion Item " + fashionItem._id + " deleted");
			res.json(fashionItem);
		}
	});
};
