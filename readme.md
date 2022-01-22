# API Shopping

API-Shopping it's an API that retrieves the price of goods from local shopping that has an online store option available.
The first one is Tesco(ie).

## Installation

To use this API you'll need [NPM](https://www.npmjs.com/), after installed you'll need to add the dependencies below:

To check the npm version you can type
```bash
npm -v
```
You'll need the dependence: [Axios](https://www.npmjs.com/package/axios), [Cheerio](https://www.npmjs.com/package/cheerio), [Express](https://www.npmjs.com/package/express), and [Nodemon](https://www.npmjs.com/package/nodemon)
This last one is more for development since the objective is to load the API for every change to the code, if you need to install the dependencies you can just type the command below for each dependence.
```bash
npm install axios
```

## Using

The API-shopping will return a json file with the price of items from TESCO based on the request below:

```bash
http://localhost:8080/shopping?item=banana
```

On the examble above, the result will bring the price of items with the word bananas on Tesco online store.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)