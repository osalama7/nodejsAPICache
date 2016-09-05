An API cache Node.js app using Express 4.
Running Locally
configure database connection string from mongoose.js

```bash
git clone https://github.com/osalama7/nodejsAPICache.git
cd nodejsAPICache
npm install
node server
```

API Endpoints

* /fashionItems/testingmemcache

creates, and gets existing cache entries

*/fashionItems/getcachedkeys

returns all existing cached keys

* /fashionItems/delcachedkeys

deletes all cached keys

* /fashionItems/delakey

deletes a memory cache item for a given key

* /fashionItems/:fashionItemId

returns a fashion item from db

testing how it can return it from cache if it existed

* /fashionItems

post end point to persist in mongodb

* /fashionItems/:fashionItemId'

delete & update existing fashion item in mongodb


* /fashionItems/clearCache'

	should delete entire content of cache