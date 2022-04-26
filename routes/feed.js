const express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload');
const firebase = require('firebase');
const fs = require('fs');
const isLoggedIn = require('./middleware');
var AWS = require('aws-sdk');
AWS.config.update({region: 'ap-south-1'});
// Create the DynamoDB service object
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});


router.get('/home', isLoggedIn, (req, res) => {

    //get the all data from dynamoDB
    var params = {
        TableName: 'Hostel',
    };
    ddb.scan(params, function (err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            // console.log("Success", data.Items);
            res.render('home', {
                hostel: data.Items,
                data: req.session.user
            });
        }
    });
});


router.get('/getFullDetail', isLoggedIn, (req, res) => {
    //get particular hostel from database
    var params = {
        TableName: 'Hostel',
        Key: {
            "Name": {
                S: req.query.id
            }
        }
    };
    
    //get all reviews from dynamoDB
    var params1 = {
        TableName: 'Review',
    };
    reviews = [];
    
    let count =0;

    ddb.getItem(params, function (err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            ddb.scan(params1, function (err, result) {
                if (err) {
                    console.log("Error", err);
                } else {
                   result.Items.forEach(element => {
                        if(element.HostelName.S == req.query.id){
                           //push all reviews to reviews array
                             reviews.push(element);
                             count++;
                        }
                    });
                    res.render('fullDetail', {
                        hostel: data.Item,
                        data: req.session.user,
                        reviews: reviews,
                        count: count
                    });
                }
            });
            // console.log("Success", data.Item);
         
        }
    });
});

router.post('/addReview',(req,res)=>{
    //add review to database
    console.log(req.body);
    //put review in dynamoDB
    var params = {
        TableName: 'Review',
        Item:{
            "Review": {
                S: req.body.review
            },
            "Name": {   
                S: req.body.Name
            },
            "Time": {
                S: req.body.date
            },
            "HostelName": {
                S: req.body.HostelName
            }
        }
    };
    ddb.putItem(params, function (err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data.Item);
            res.redirect('/getFullDetail?id='+req.body.HostelName);
        }
    });
})

module.exports = router;