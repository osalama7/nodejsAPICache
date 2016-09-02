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

*/fashionCacheRandomStrings

creates random strings

* /fashionCacheFoo

response foo: bar and caches this value

*/fashionItems/:fashionItemId

returns a fashion item from db

testing how it can return it from cache if it existed

*/fashionItems

post end point to persist in mongodb

*/fashionItems/:fashionItemId'

delete & update existing fashion item in mongodb

