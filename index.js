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
// SET OUR VIEWS AND VIEW ENGINE


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/', require('./routes/auth'));
app.use('/', require('./routes/owner'));


app.get('/home',isLoggedIn, (req, res) => {
  
    res.render('home',{data:req.session.user});
  
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

app.get('/AddHostel',isLoggedIn,(req,res)=>{  
    res.render('AddHostel',{data:req.session.user})
})


const port = process.env.PORT || 4001
app.listen(port, () => {console.log(`Server is listing on port ${port}`)});