# clothes-shop - in MEAN stack AND iOS(Swift) version

[![Build Status](https://travis-ci.org/sandagolcea/clothes-shop.svg?branch=master)](https://travis-ci.org/sandagolcea/clothes-shop) 
[![Code Climate](https://codeclimate.com/github/sandagolcea/clothes-shop/badges/gpa.svg)](https://codeclimate.com/github/sandagolcea/clothes-shop)  

#iOS - Swift version
![productView](/readmeImages/iOS_productsView.png?raw=true "Products")
![productDetail](/readmeImages/iOS_productDetail.png?raw=true "Detail")
![cartView](/readmeImages/iOS_cartView.jpg?raw=true "Cart")

##to run
`git clone git@github.com:sandagolcea/clothes-shop.git`   

- you will have to install and run the node server for the product photos 
or alt modify the URLs in ProductLoader.swift  
see "to run - for the first time" section for this  

- `open iOS/ClothesShop/ClothesShop.xcodeproj/`  
- run project (`command + r`)  


# Angular + Node/Express with MongoDB version
Build on the MEAN stack:  

- FrontEnd: AngularJS  
- BackEnd: NODE.js with Express, using a MongoDB for products, categories and vouchers  

Can be found online [clothes-shop.herokuapp.com](http://clothes-shop.herokuapp.com)
![Alt text](/readmeImages/productsView.png?raw=true "Optional Title")
![Alt text](/readmeImages/cartView.png?raw=true "Optional Title")
![Alt text](/readmeImages/singleProduct.png?raw=true "Optional Title")
![Alt text](/readmeImages/filter.png?raw=true "Optional Title")


##to run - for the first time
`git clone git@github.com:sandagolcea/clothes-shop.git`   
`cd clothes-shop`  
`npm install`
`bower install`  
`npm run seed` - (you will have to manually close it after some seconds)
`npm start`  
goto localhost:3000  

##to run (2nd+ time)
`cd clothes-shop`  
`npm start` - this starts both mongoDB and the server  
goto localhost:3000  

#to clean the database
`npm run flush`  
*to reseed `npm run seed`  
configuration files can be found in the config folder

##to test
###Unit tests
`npm test`  

###End to End tests
- `npm start`  
- `npm run update-webdriver`  - for first time run  
- `npm run protractor` - starting both the webdriver and protractor  
*try running npm run protractor twice if it fails the first time*

#####for continuous run:
- `npm start`  
- `npm run webdriver`
- `grunt`  
*npm run webdriver fails if webdriver already running, just proceed to grunt command*


##to seed the db
Open the database: `npm run mongodb`  
Seed into the database: `npm seed`  
To remove all the records in the database:
`node flushDB.js`  

###Technologies:
- MEAN stack: MongoDB, NODEjs with Express, Angular
- unit tests: jasmine & karma
- e2e tests: protractor
- PhantomJS and Selenium driver, grunt
- javascript, html, css, bootstrap

###Live version
- hosted on [Heroku](https://clothes-shop.herokuapp.com)
- using MongoLabs for DBaaS
