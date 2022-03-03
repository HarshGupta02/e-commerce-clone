const functions = require("firebase-functions");
const express = require("express");  // alternative of import statement in nodejs
const cors = require("cors");
const { request } = require("express");
const stripe = require("stripe")('sk_test_51KR8R1SIj9g28rKLWw3NkPxy6e2884LkTEP6CdRZR6Pn6REfp9mZqzdZ4iyDMkJSI8o7MxQw3nPxAb0HZNc3ogOk00nzvVDW6y')
// pass the secret test key from the stripe above.

// this is the code needed for running backend express app on a cloud function.

// API

/// app-config
const app = express();

// middleware
app.use(cors({ origin : true })); // regarding security 
app.use(express.json()); // helps to pass the data in json format.

// api routes

// both get and post are used to transfer data from client to the server in http protocol but in case of get,
// data is transferred through url (which is in header) and in post, data is transferred thorugh message body.

app.get("/",(request,response) => response.status(200).send('hello world'));// we are calling an api by first requesting
// info from it and it gives a status of 200 and it gives the response back as "hello world"
// here the end point is '/' and we can change it.

/// so basically what is happening is that express is a backend app running on google cloud and we request something
/// and wait for the response from backend and if we get a status of 200 , it means that a response was send back
/// and we want the backend to display "hello world " but where so it is displayed on a url genereated by
/// running the emulators and this url here is =" http://localhost:5001/clone-cfcff/us-central1/api" and 
/// chaning it to /api/harsh so the response is transferred to this url and so the messgage hello world is
/// displayed here.  so we are basically running the cloud functions locally on a machine and getting to see the 
/// output of the cloud functions on the local host( or the url given above).

app.post("/payments/create",async(request,response) => {
    const total=request.query.total;
    console.log('payment request received BOOM !!! for this amount >>>',total)

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, // amount in subunits.
        currency: "usd",
    });
    // status 201 means everything ok and created something.
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    });
});

// listen command
exports.api = functions.https.onRequest(app); 
// exports.api = functions.runWith(runtimeOpts).https.onRequest(app);