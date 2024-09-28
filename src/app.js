const express = require('express');
require('./db/conn');
const Register = require('./models/register')
const app = express();
const hbs = require('hbs');
const path = require('path');
const bcrypt = require('bcryptjs')
const PORT = process.env.PORT || 5000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partial_path = path.join(__dirname, "../templates/partials");
//E:\WEBDEVELOPMENT PROJECTS\new project\SGP-PROJECT1\templates\views\partials
console.log(partial_path);
console.log(template_path);

app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use(express.static(static_path));
app.set('views', template_path);
app.set('view engine', 'hbs');
hbs.registerPartials(partial_path);

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/login', (req, res) => {
    res.render('login');
});
app.get('/home', (req, res) => {
    res.render('home');
});

app.get('/sign', (req, res) => {
    res.render('sign');
});

app.post('/login', async (req, res) => {
    try {

        const password = req.body.password;

            const registerEmployee = new Register({
                name: req.body.name,
                email : req.body.email,
                password : req.body.password
            });

            const registered = await registerEmployee.save();
            res.status(200).render('home');

    } catch (error) {
        res.status(400).send(error);
    }
});


app.post('/sign', async (req, res) => {
    try {

        const email = req.body.email;
        const password = req.body.password;

        const username = await Register.findOne({email:email})

        if(username.password===password){
            res.render('home');
        }
        else{
            res.status(400).send(error);
        }


    } catch (error) {
        res.send("There is some technical issue please try agian later")
    }
})

app.listen(PORT, () => {
    console.log("Listening to the port ", PORT);
});