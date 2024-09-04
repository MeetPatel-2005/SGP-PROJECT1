const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://23dcs082:*****@cluster0.s521t.mongodb.net/registration")
.then(() => {
    console.log("Connection has been setup successfully");
})
.catch((e) => {
    console.log(e);
}) 