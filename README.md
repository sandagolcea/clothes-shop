# clothes-shop - in MEAN stack AND iOS(Swift) version

[![Build Status](https://travis-ci.org/sandagolcea/clothes-shop.svg?branch=master)](https://travis-ci.org/sandagolcea/clothes-shop) 
[![Code Climate](https://codeclimate.com/github/sandagolcea/clothes-shop/badges/gpa.svg)](https://codeclimate.com/github/sandagolcea/clothes-shop)  

#iOS - Swift version

####Products view:  

![productView](/readmeImages/iOS_productsView.png?raw=true "Products")

####Individual product view:  
![productDetail](/readmeImages/iOS_productDetail.png?raw=true "Detail")

####Shopping cart view:  
![cartView](/readmeImages/iOS_cartView.png?raw=true "Cart")

###Stories supported

- Adding products to the shopping cart
- Does not add products that are not in stock to the cart
- Removing product from the shopping cart
- Total price for shopping cart is currently displayed

###Project folder structure

- All the iOS relevant files can be found in the iOS folder

###Improvements

- Image caching, possibly using an existing library
- Load products from the backend
- Add support for vouchers
- Unit tests

###Learning Points

- I've started the project on Sunday the 24th of May with absolutly zero knowledge of Swift or other mobile programming languages, and have gone through the basic swift syntax, XCode, basic iOS UI; setting up views and controllers, product tables, creating segues and managed to create a basic iOS application in less than a week.

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

###Can be found online at [clothes-shop.herokuapp.com](http://clothes-shop.herokuapp.com)

####Main products view:
![Alt text](/readmeImages/productsView.png?raw=true "Optional Title")

####Cart view:
![Alt text](/readmeImages/cartView.png?raw=true "Optional Title")

####Single product view:
![Alt text](/readmeImages/singleProduct.png?raw=true "Optional Title")

###Filter applied:
![Alt text](/readmeImages/filter.png?raw=true "Optional Title")

###Stories supported

- Adding products to the shopping cart
- Does not add products that are not in stock to the cart
- Removing products from the shopping cart
- Total price for shopping cart is currently displayed
- Vouchers can be applied (updated when removing products)
- User alerted when valid/invalid voucher is applied
- Total price after applying vouchers is displayed (vouchers applied are also displayed)

###Project folder structure

- Angular and other files (images, css, html) files are stored in the **public folder**, as these are visible to the user
- the **config folder** stores files that are necessary for setting up a local application (a seed file for seeding the products into the database, a flush file for removing all data from the DB, and json files containing seed info: products, categories and vouchers).
- **app** folder stores the models used by mongoDB
- **test** folders stores 2 folders: **unit** for unit tests, and **e2e** for end to end protractor tests

###Improvements
- persistence of shopping cart, either in the browser using local storage, or in the server
- storage of the images on the cloud
- checkout ability
- user sign in/out

###Learning Points
- this has been my first project using Angular, as such my application has undergone many changes as my understanding of Angular grew. I have used NODEjs/Express in the past and was really happy to finally be able to make a project using the entire MEAN stack.

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
