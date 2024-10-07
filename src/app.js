const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('./firebase'); // Firebase connection
const hbs = require('hbs');
const path = require('path');
const PORT = process.env.PORT || 7500;

const app=express();

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partial_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set('views', template_path);
app.set('view engine', 'hbs');
hbs.registerPartials(partial_path);

// Render pages
app.get('/', (req, res) => res.render('login'));
app.get('/about', (req, res) => res.render('about'));
app.get('/login', (req, res) => res.render('login'));
app.get('/home', (req, res) => res.render('home'));
app.get('/Cart', (req, res) => res.render('Cart'));
app.get('/sign', (req, res) => res.render('sign'));

// Registration (Sign Up) Handler
app.post('/login', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    };

    // Save to Firebase
    const userRef = db.collection('users').doc(req.body.email);
    await userRef.set(newUser);
    
    res.status(200).render('home');
  } catch (error) {
    res.status(400).send(error);
  }
});

// Login Handler
// Login Handler
app.post('/sign', async (req, res) => {
    try {
      const email = req.body.email;
  
      if (!email || email.trim() === "") {
        return res.status(400).send("Email is required");
      }
  
      const password = req.body.password;
  
      // Fetch user from Firebase
      const userRef = db.collection('users').doc(email);
      const doc = await userRef.get();
  
      if (!doc.exists) {
        return res.status(400).send("User not found");
      }
  
      const user = doc.data();
  
      // Compare password
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        return res.render('home', { user: { name: user.name, email: user.email } }); // Pass user data to the home page
        res.render('home');
      } else {
        res.status(400).send("Invalid password");
      }
  
    } catch (error) {
      res.send("There is some technical issue, please try again later.");
    }
  });
  

// Listen to the port
app.listen(PORT, () => {
  console.log("Listening to the port ", PORT);
});
