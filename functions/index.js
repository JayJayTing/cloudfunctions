const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });
const axios = require("axios");
const accountSid = "";
const authToken = "";
const client = require("twilio")(accountSid, authToken);
const queries = require("./queries");
const admin = require("firebase-admin");
admin.initializeApp();
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
const db = admin.firestore();
function sendMessageToSeller(buyerNumber, message) {
	return axios
		.post(`https://wine-falcon-1356.twil.io/messageBuyer`, {
			phone_number: buyerNumber,
			body: message
		})
		.catch(err => {
			console.log(err);
			throw Error(err);
		});
}

exports.helloWorld = functions.https.onRequest((request, response) => {
	response.send("Hello, " + request.query.name);
});

exports.twilioSendSeller = functions.https.onRequest((request, response) => {
	client.messages
		.create({
			body: request.query.message,
			from: "+16474961371",
			to: request.query.phone_number
		})
		.then(message => {
			console.log(message.sid);

			response.send("sent the message" + request.query.message);
			return;
		})
		.catch(err => {
			console.log(err);
			response.send("error sending the message");
			throw Error(err);
		});
});

exports.createUser = functions.https.onRequest((req, res) => {
	db.collection("Users")
		.doc("test")
		.set({ name: req.query.userInfo })
		.then(() => {
			res.send("done");
		})
		.catch(err => {
			console.log(err);
			res.send("err creating the user");
		});
});
