const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/assignment", { useNewUrlParser: true,useUnifiedTopology: true  }).then(dbResult => {
	console.log("Connection Successfull");
}).catch(err => {
	console.log("Error while connecting DB", err);
})