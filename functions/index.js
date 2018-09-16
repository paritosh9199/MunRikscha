const functions = require('firebase-functions');
const express = require("express");
const app = express();
const sgMail = require('@sendgrid/mail');
const cors = require('cors');

app.use(cors({ origin: true }));


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


// app.get("/", function (req, res) {
//     
//     const msg = {
//         to: 'paritoshsrivastava9199@gmail.com',
//         from: 'index@test.com',
//         subject: 'Sending with SendGrid is Fun',
//         text: 'and easy to do anywhere, even with Node.js',
//         html: '<strong>and easy to do anywhere, even with Node.js</strong>',
//     };
//     sgMail.send(msg,function(err){
//         res.send(err);
//     }).then(function(){
//         res.send("sent");
//     });
//     // res.redirect("/mailSent");
// });
// app.get("/conf",function(request,response){
//     response.write("message sent successfully");
    
//     setTimeout(function(){
//         response.write("<script> window.location = http://google.com</script>");
//         response.end();
//     },2000);
// });
app.post("/send",function(request,response){
    sgMail.setApiKey();
    if (request.method !== "POST") {
        // response.send(405, 'HTTP Method ' + request.method + ' not allowed');
        // revanth.jamapana@gmail.com
        response.send(405, "Invalid Request")
    } else {
        const msg = {
            to: 'paritoshsrivastava9199@gmail.com',
            from: 'noreply@rikscha-now.de',
            subject: 'Customer Request from '+rotcc13(request.query.n),
            text: rotcc13(request.query.n)+" Email: "+rotcc13(request.query.e)+" Phone: "+rotcc13(request.query.p)+" Message: "+rotcc13(request.query.m),
            html: "<strong>"+rotcc13(request.query.n)+"</strong><br>Email: "+rotcc13(request.query.e)+" <br>Phone: "+rotcc13(request.query.p)+" <br><h5>Message: </h5>"+rotcc13(request.query.m),
        };
        // const msg = {
        //     to: 'raja_rajeshwari@isb.edu',
        //     from: 'paritoshsrivastava9199@gmail.com',
        //     subject: 'hey ssup!',
        //     text: 'hey watchadoing! exploit 101',
        //     html: '<b>hey watchadoing</b>! exploit 101'
        // };
        try {
            var b = 0;
            sgMail.send(msg).then(function () {
                b = 1;
                response.send({ success : true });
                response.end();
                return { success : true };
                // response.send(rotcc13(request.query.n)+" Email: "+rotcc13(request.query.e)+" Phone: "+rotcc13(request.query.p)+" Message: "+rotcc13(request.query.m));
            }).catch(function (err) {
                b = 0;
                console.log(err);
                response.send({ success : false });
                response.end();
            });

        } catch (err) {
            // console.log(err);
            // response.send("mail not sent! Server err: "+err);
        }
        // response.send("yo!");
    }
});

// app.listen(3000,process.env.IP,function(){
//     console.log("server has started");
// });

// exports.helloWorld = functions.https.onRequest((request, response) => {
//     response.send("Hello from Firebase!");
// });

function rotcc13(str) {
    var input = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
    var output = 'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm0987654321';
    var index = x => input.indexOf(x);
    var translate = x => index(x) > -1 ? output[index(x)] : x;
    return str.split('').map(translate).join('');
}

// exports.conf = functions.https.onRequest((request, response) => {
//     cors(request, response, () => {});
//     response.write("message sent successfully");
//     setTimeout(function(){
//         response.redirect("http://google.com");
//     },2000);
// });

// exports.sendMail = functions.https.onRequest((request, response) => {
//     cors(request, response, () => {});
//     sgMail.setApiKey("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");

//     if (request.method !== "POST") {
//         // response.send(405, 'HTTP Method ' + request.method + ' not allowed');
//         response.send(405, "Invalid Request")
//     } else {
//         const msg = {
//             to: 'paritoshsrivastava9199@gmail.com',
//             from: 'noreply@rikscha-now.de',
//             subject: 'Customer Request from '+rotcc13(request.query.n),
//             text: rotcc13(request.query.n)+" Email: "+rotcc13(request.query.e)+" Phone: "+rotcc13(request.query.p)+" Message: "+rotcc13(request.query.m),
//             html: "<strong>"+rotcc13(request.query.n)+"</strong><br>Email: "+rotcc13(request.query.e)+" <br>Phone: "+rotcc13(request.query.p)+" <br><h6>Message: </h6>"+rotcc13(request.query.m),
//         };
//         try {
//             var b = 0;
//             sgMail.send(msg).then(function () {
//                 b = 1;
//                 return response.redirect("/conf");
//                 // response.send(rotcc13(request.query.n)+" Email: "+rotcc13(request.query.e)+" Phone: "+rotcc13(request.query.p)+" Message: "+rotcc13(request.query.m));
//             }).catch(function (err) {
//                 b = 0;
//                 console.log(err);
//                 response.send("mail not sent! Server err: " + err);
//             });

//             if(b === 1){
//                 response.send(request.body);
//             } else {
//                 response.render("/");
//             }

//         } catch (err) {
//             // console.log(err);
//             // response.send("mail not sent! Server err: "+err);
//         }
//         // response.send("yo!");
//     }

//     // response.send(request.body);

// });
exports.cloudfn = functions.https.onRequest(app);
