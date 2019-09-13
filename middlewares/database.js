const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://admin:admin123@localhost:27017/admin", { useNewUrlParser: true,useUnifiedTopology: true  }).then(dbResult => {
	console.log("Connection Successfull");
}).catch(err => {
	console.log("Error while connecting DB", err);
})