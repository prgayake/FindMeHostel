const express = require('express');
const router = express.Router();
const firebase = require('firebase');


const firebaseConfig = {
    apiKey: "AIzaSyBnSK9p5id0VspBk3uarzFS-6ytjWRAv2U",
    authDomain: "findmehostel-f4735.firebaseapp.com",
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
    firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password)
        .then(user => {
            //if user is created successfully, send response to client
        console.log(user);
        })
        .catch(err => {
            //if error occurs, send error response to client
            res.send(err);
        });

});

//signin route with firebase authentication
router.post('/login', (req, res) => {
    //get email and password from request body
    console.log(req.body);
    // //signin user with email and password using firebase
    firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
        .then(user => {
            //if user is signed in successfully, send response to client
            const user = firebase.auth().currentUser;
        res.render('home');
        })
        .catch(err => {
            //if error occurs, send error response to client
            res.send(err);
        });
        
});

module.exports = router;