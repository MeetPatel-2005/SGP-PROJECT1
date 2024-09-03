const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/registration")
.then(() => {
    console.log("Connection has been setup successfully");
})
.catch((e) => {
    console.log(e);
}) 