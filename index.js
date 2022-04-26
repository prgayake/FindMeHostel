const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const firebase = require('firebase');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const isLoggedIn = require('./routes/middleware');

const publicDirectory = path.join(__dirname, './public/assets');
app.use(express.static(publicDirectory));
const publicDirectory1 = path.join(__dirname, './public/assets1');
app.use(express.static(publicDirectory));
app.use(express.static(publicDirectory1));

// SET OUR VIEWS AND VIEW ENGINE


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/', require('./routes/auth'));
app.use('/', require('./routes/owner'));
app.use('/', require('./routes/feed'));
app.use('/', require('./routes/Admin'));




app.get('/',(req,res)=>{
    
    res.render('index')
})

app.get('/login',(req,res)=>{
    
    res.render('login')
})

app.get('/signup',(req,res)=>{
    
    res.render('signup')
})

app.get('/hostelAdd',isLoggedIn,(req,res)=>{  
    res.render('AddHostel',{data:req.session.user})
})

app.get('/OwnerProfile',isLoggedIn,(req,res)=>{
    res.render('OwnerProfile',{data:req.session.user})
})
app.get('/owner',isLoggedIn,(req,res)=>{
    res.redirect('/ownerPage')
});

app.get('/Admin',isLoggedIn,(req,res)=>{
    res.redirect('/Admin');
})

const port = process.env.PORT || 4001
app.listen(port, () => {console.log(`Server is listing on port ${port}`)});