# Elasticsearch webhook example
The following is an example of sending Contentstack Entries to Elasticsearch for indexing. The index is created on publish for an Entry/Locale pair. The index is deleted when an entry is unpublished or deleted, based on an Entry/Locale pair.

## Instructions

Your Elasticsearch node's URL can be provided via a `.env` file or the `ELASTIC_URL` environment variable. It defaults to `http://localhost:9200`.
#### Step 1
```
$ npm install
$ npm run
```
 
#### Step 2
In a new terminal:
```
$ ngrok http 3000
```

#### Step 3
* Import `webhook.json` into Contentstack, and change the `URL to notify` to your ngrok address. Keeping the `/api/auto` segment in the URL.
* Example: https://e9faa9824a35.ngrok.io/api/auto

## Testing
Contentstack Index: `http://localhost:9200/contentstack/_search?pretty=true&q=*:*`
