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

*1- /fashionCacheRandomStrings
*creates random strings
*2- /fashionCacheFoo
*response foo: bar and caches this value
*3- /fashionItems/:fashionItemId
*returns a fashion item from db
*testing how it can return it from cache if it existed
*4- /fashionItems
*post end point to persist in mongodb
*5-/fashionItems/:fashionItemId'
*delete & update existing fashion item in mongodb

