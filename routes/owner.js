const express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload');
const firebase = require('firebase');
const isLoggedIn = require('./middleware');
const env = require('dotenv').config();
var AWS = require('aws-sdk');
var fs = require('fs');

AWS.config.update({
    region: 'ap-south-1'
});

router.use(fileUpload());

// Create the DynamoDB service object
var ddb = new AWS.DynamoDB({
    apiVersion: '2012-08-10'
});

const s3 = new AWS.S3({
    params: {
        Bucket: 'findmehostel'
    }
});


router.post('/AddHostel', isLoggedIn, async (req, res) => {

    var params = {
        TableName: 'Hostel',
        Item: {
            "Name": {
                S: req.body.HostelName
            },
            "address": {
                S: req.body.address
            },
            "description": {
                S: req.body.description
            },
            "city": {
                S: req.body.city
            },
            "state": {
                S: req.body.state
            },
            "college": {
                S: req.body.college
            },
            "OwnerName": {
                S: req.body.OwnerName
            },
            "OwnerEmail": {
                S: req.body.OwnerEmail
            },
            "OwnerPhone": {
                S: req.body.OwnerPhone
            },
            "AdditionalInfo": {
                S: req.body.AdditionalInfo
            },
            "Latitude": {
                S: req.body.Latitude
            },
            "Longitude": {
                S: req.body.Longitude
            }

        }
    };


    // Call DynamoDB to add the item to the table
    ddb.putItem(params, function (err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data);
            res.redirect('/home');
        }
    });



})

router.get('/ownerPage', isLoggedIn, (req, res) => {
    //get all hostels from dynamoDB
    const params = {    
        TableName: 'Hostel',
    };
    
    let hostels = [];
    let count =0;
    ddb.scan(params, function (err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            data.Items.forEach(element => {
                if(element.OwnerEmail.S == req.session.user.email){
                    //push all reviews to reviews array
                    hostels.push(element);
                    count++;
                }
            });
            res.render('owner', {
                hostels: hostels,
                data: req.session.user,
                count: count
            });
        }
    })
})

router.get('/ownerProfile', isLoggedIn, (req, res) => {
    const params = {    
        TableName: 'Hostel',
    };
    
    let hostels = [];
    let count =0;
    ddb.scan(params, function (err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            data.Items.forEach(element => {
                if(element.OwnerEmail.S == req.session.user.email){
                    //push all reviews to reviews array
                    hostels.push(element);
                    count++;
                }
            });
            res.render('OwnerProfile', {
                hostels: hostels[0],
                data: req.session.user,
                count: count
            });
        }
    })
})

module.exports = router;