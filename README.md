# clothes-shop
[![Build Status](https://travis-ci.org/sandagolcea/clothes-shop.svg?branch=master)](https://travis-ci.org/sandagolcea/clothes-shop) 
[![Code Climate](https://codeclimate.com/github/sandagolcea/clothes-shop/badges/gpa.svg)](https://codeclimate.com/github/sandagolcea/clothes-shop)  
Practice clothes shop - build on the MEAN stack:  
FrontEnd: AngularJS
BackEnd in NODE.js with Express, using a MongoDB for products

##to run
`git clone git@github.com:sandagolcea/clothes-shop.git`   
`cd clothes-shop`  
`npm start`  
goto localhost:3000  

##to test
###Unit tests
`npm test`  

###End to End tests
- `npm start` - this starts both the db and the node server
- `npm run protractor` - starting both the webdriver and protractor  
#####for continuous run:
- `npm start`  
- `npm run webdriver`
- `grunt`  


##to seed the db
Open the database: `npm run mongodb`  
Seed into the database: `npm seed`  

###Technologies:
- MEAN stack: MongoDB, NODEjs with Express, Angular
- unit tests: jasmine & karma
- e2e tests: protractor
- PhantomJS and Selenium driver, grunt
- javascript, html, css, bootstrap

###Live version
- hosted on [Heroku](https://clothes-shop.herokuapp.com)
- using MongoLabs for DBaaS
