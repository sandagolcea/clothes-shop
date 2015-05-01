# clothes-shop
Practice clothes shop - build in AngularJS
Served on a static NODE.js server
In progress: Setting up MongoDB & NODE.js backend atm

##to run
`git clone git@github.com:sandagolcea/clothes-shop.git`    
`cd clothes-shop`  
`mongod --dbpath data/db`  
open new tab:  
`node server.js`  
open new tab (or simply goto localhost:3000):  
`/usr/bin/open -a "/Applications/Google Chrome.app" 'http://localhost:3000'`  

##to test
###Unit tests
With jasmine+karma
`karma start test/karma.conf.js`  
###End to End tests
With protractor
Start mongoDB `mongod --dbpath data/db`  
Start server `node server.js`  
Start webDriver `webdriver-manager start --standalone`  
Start tests `protractor conf.js`  


##to seed the db
Open the database: `mongod --dbpath data/db`  
Seed into the database: `node js/seedFile.js`  
