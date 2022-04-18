const express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload');
const firebase = require('firebase');
const AWS = require('aws-sdk');
const fs = require('fs');
const isLoggedIn = require('./middleware');

router.use(fileUpload());


AWS.config.update({
        accessKeyId: 'AKIAUNTJLAUF32JUC2ZR',
        secretAccessKey: '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'
    })

const s3 = new AWS.S3({
    params: {
        Bucket: 'findmehostel'
    }
});

router.post('/addhostel',isLoggedIn, async (req, res) => {
    const {files} = req;
    
    // add hostel to firebase
    const hostel = {
        name: req.body.HostelName,
        address: req.body.address,
        description: req.body.description,
        city: req.body.city,
        state: req.body.state,
        college: req.body.college,
        OwnerName: req.body.OwnerName,
        OwnerEmail: req.body.OwnerEmail,
        OwnerPhone: req.body.OwnerPhone,
        AdditionalInfo: req.body.AdditionalInfo,

    }
    // insert data to firebase realtime database
    const hostelRef = firebase.database().ref('hostels/' + req.body.HostelName);
    hostelRef.set(hostel);
    for(let i=0;i<(files.Files).length;i++){
        uploadFileS3(files.Files[i].data,req.body.HostelName+'/'+files.Files[i].name);
    }

    


})
async function  uploadFileS3(data,name){
        try {
        const upload = new AWS.S3.ManagedUpload({
            params: {
                // pass directly the buffer string
                Body: data,
                // pass the file name
                Key: name,
            },
            // use the const s3 that we defined above
            service: s3,
        })

        const response = await upload.promise()

        console.log(response)
    } catch (error) {
       console.log(error);
    }
}

module.exports = router;