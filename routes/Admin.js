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

router.get('/Admin', isLoggedIn, (req, res) => {
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
                hostels.push(element);
                    count++;
                
            });
            res.render('Admin', {
                hostels: hostels[0],
                data: req.session.user,
                count: count
            });
        }
    })
});

module.exports = router;