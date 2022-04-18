const express = require('express');
const router = express.Router();
const firebase = require('firebase');
const session = require('express-session');
const cookieParser = require('cookie-parser');

router.use(cookieParser());
router.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

const firebaseConfig = {
    apiKey: "AIzaSyBnSK9p5id0VspBk3uarzFS-6ytjWRAv2U",
    authDomain: "findmehostel-f4735.firebaseapp.com",
    databaseURL: "https://findmehostel-f4735-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "findmehostel-f4735",
    storageBucket: "findmehostel-f4735.appspot.com",
    messagingSenderId: "236095233430",
    appId: "1:236095233430:web:0d848e2493f1546fa711b7"
  };
  
firebase.initializeApp(firebaseConfig);
//create signup route with firebase authentication
  
router.post('/signup', (req, res) => {
    //get email and password from request body
    console.log(req.body);
    //create user with email and password using firebase
    if(req.body.password === req.body.cpassword){
    firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password)
        .then(user => {

            const user1 = firebase.auth().currentUser;
            user1.updateProfile({
                displayName:req.body.name
                
            }).then(() => {
                console.log("User Updated");
                res.redirect('/login');
            }).catch((error) => {
                // An error occurred
                // ...
            });
        })
        .catch(err => {
            //if error occurs, send error response to client
            res.send(err);
        });
    }
});

//signin route with firebase authentication
router.post('/login', (req, res) => {
    //get email and password from request body
    // //signin user with email and password using firebase
    
    firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
        .then(user => {
            //if user is signed in successfully, send response to client
            const user1 = firebase.auth().currentUser;
            req.session.user = user1;
            req.session.save();
            console.log(user1.displayName);
                res.redirect('/home');
        })
        .catch(err => {
            //if error occurs, send error response to client
            res.send(err);
        });

});

module.exports = router;