[![Contentstack](https://www.contentstack.com/docs/static/images/contentstack.png)](https://www.contentstack.com/)

# Elasticsearch webhook example

About Contentstack: Contentstack is a headless CMS with an API-first approach that puts content at the centre. It is designed to simplify the process of publication by separating code from content.

Elasticsearch is a popular distributed and open source search engine. It is used for storing, searching, and analyzing huge volumes of data. It provides search results faster than other search engines because instead of searching for text, it searches an index.

In this example, we demonstrate the use of Elasticsearch with Contentstack by sending Contentstack Entries to Elasticsearch for indexing. This index is created when the entry is published and gets deleted when it is deleted.


## Execution steps

Your Elasticsearch node's URL can be provided via a `.env` file or the `ELASTIC_URL` environment variable. It defaults to `http://localhost:9200`.

#### Step 1
```
$ npm install
$ npm start
```
 
#### Step 2
In a new terminal:
```
$ ngrok http 3000
```

#### Step 3
* Import `webhook.json` into Contentstack, and change the `URL to notify` to your ngrok address. Keeping the `/api/auto` segment in the URL.
* Example: https://add-ngrok-url-here/api/auto

## Testing
Contentstack Index: `http://localhost:9200/contentstack/_search`

## Documentation

Read Contentstack [docs](https://www.contentstack.com/docs/)

Read Guide [Elastic Search](will-be-updated)
