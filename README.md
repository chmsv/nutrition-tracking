# Nutrition and calorie tracker
Calculator for tracking nutrition and calories of products.

![preview image](https://drive.google.com/file/d/1OJ2qm3LrDkL62RtrUA9pbUictJWKcfWG)

#### Frontend:
- Enter product name and weight
- Sending product name and weight to the backend
- Displaying data received from the backend

#### Backend:
- Get data from client
- Translate it from Russian into English
- Request to MongoDB
- Request to Nutritionix API
- Store data
- Return data


## Build with
- React
- Redux
- TailwindCSS
- ExpressJS
- Mongoose`*`
- Webpack
`*`*Connected via environment variables.*

- Nutritionix API for retrieving data
- npm package for translation from Russian to English

## Notice
Minimum supported `Node.js` version is `12.13.0`

## How to use it?
Install modules
```
yarn install
```

Run a project in development mode
```
yarn run dev
```

Run server only
```
yarn run watch:server
```

Run client only
```
yarn run watch:client
```

Build a project
```
yarn run build
```
