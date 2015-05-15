# clothes-shop
Practice clothes shop - build in AngularJS
Served on a static NODE.js server
BackEnd in NODE.js with Express, using a MongoDB for products

##Code climate
[![Code Climate](https://codeclimate.com/github/sandagolcea/clothes-shop/badges/gpa.svg)](https://codeclimate.com/github/sandagolcea/clothes-shop)

##to run
`git clone git@github.com:sandagolcea/clothes-shop.git`    
`cd clothes-shop`  
`mongod --dbpath data/db`  
open server in new tab: `node server.js` or `npm start` or `nodemon`  
goto localhost:3000  

##to test
###Unit tests
`npm test`  

###End to End tests
With protractor
Start mongoDB `mongod --dbpath data/db`  
Start server `node server.js`  
Start webDriver `webdriver-manager start --standalone`  
Start tests `protractor e2e/conf.js` or `grunt` (to have them continuously running)  


##to seed the db
Open the database: `mongod --dbpath data/db`  
Seed into the database: `node js/seedFile.js`  

###Technologies:
- MEAN stack: MongoDB, NODEjs with Express, Angular
- unit tests: jasmine & karma
- e2e tests: protractor
- PhantomJS and Selenium driver, grunt

###Live version
- hosted on [Heroku](https://clothes-shop.herokuapp.com)
- using MongoLabs for DBaaS
