//fashionItem mongoose model

var mongoose = require('mongoose'),
 Schema = mongoose.Schema;
	var FashionItemSchema = new Schema ({
		name: {
		type: String,
		trim: true
		}
	});
mongoose.model('FashionItem', FashionItemSchema);