sqlNode
=======

**API test for run on Raspberry pi using mysql and node, but it should work fine in all platforms.**

Steps
-----

### Create mySQL database

Create a data base user:

**name:** *node*

**pass:** *nodejs*

Create a new data base:

**name:** *sqlNode*

**You can use your own credentials by setting it in cfg/development.js file**

### Setting initial data

Standing on te path you cloned this repo, run the following command:

```console
$ npm run-script init
```

It will create default data on DB

### Run the app

Now you can run this node app with **node**, **supervisor**, **nodemon** or whatever you like:

```console
$ node index.js

//Enviroment:  development
//Init v1
//Server listening port:  6363
```

Then go to you DB and copy your accessKey from Apps table, use it to make requests to the API:

**http://localhost:6363/?accessKey={{ your accessKey }}**

It returns:

```javascript
{"data":{"message":"Some important data"}}
```

**This is a test, so it only handles '/' request, otherwise will returns you an error**
