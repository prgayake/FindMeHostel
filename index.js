const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const firebase = require('firebase');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//setting Public directory
const publicDirectory = path.join(__dirname, './public/assets');
app.use(express.static(publicDirectory));
// SET OUR VIEWS AND VIEW ENGINE

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/', require('./routes/auth'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/home', (req, res) => {
    res.render('home');
});
app.get('/',(req,res)=>{
    
    res.render('index')
})

app.get('/login',(req,res)=>{
    
    res.render('login')
})

app.get('/signup',(req,res)=>{
    
    res.render('signup')
})



const port = process.env.PORT || 4001
app.listen(port,'100.100.1.111');