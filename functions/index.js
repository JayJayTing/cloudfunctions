const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });
const axios = require("axios");
const accountSid = "ACc11d601fb12cb9b24cdc12c43c465505";
const authToken = "ea728e0e4020d785c49634854fdf5493";
const client = require("twilio")(accountSid, authToken);
//const queries = require("./queries");
const admin = require("firebase-admin");
//const express = require("express");

admin.initializeApp({
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID
});
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

const db = admin.firestore();

// exports.corsEnabledFunction = (req, res) => {
// 	// Set CORS headers for preflight requests
// 	// Allows GETs from any origin with the Content-Type header
// 	// and caches preflight response for 3600s

// 	res.set("Access-Control-Allow-Origin", "*");

// 	if (req.method === "OPTIONS") {
// 		// Send response to OPTIONS requests
// 		res.set("Access-Control-Allow-Methods", "GET");
// 		res.set("Access-Control-Allow-Headers", "Content-Type");
// 		res.set("Access-Control-Max-Age", "3600");
// 		res.status(204).send("");
// 	} else {
// 		res.send("Hello World!");
// 	}
// };

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
	response.send("Hello, ");
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
	cors(req, res, () => {
		db.collection("Users")
			.doc(req.body.uid)
			.set(req.body)
			.then(() => {
				res.send("done");
			})
			.catch(err => {
				console.log(err);
				res.send("err creating the user");
			});
	});
});

exports.getUser = functions.https.onRequest((req, res) => {
	cors(req, res, () => {
		db.collection("Users")
			.doc(req.query.userId)
			.get()
			.then(response => {
				res.send(response.data());
			});
	});
});

exports.getAllTickets = functions.https.onRequest((req, res) => {
	let tickets = {};
	cors(req, res, () => {
		db.collection("tickets")
			.where("opponent", "==", req.query.opponent)
			.where("gameDate", "==", req.query.date)
			.where("sold", "==", false)
			.get()
			.then(response => {
				response.forEach(doc => {
					tickets[doc.id] = doc.data();
				});
				res.send(tickets);
			});
	});
});

exports.listTicket = functions.https.onRequest((req, res) => {
	cors(req, res, () => {
		db.collection("tickets")
			.add({
				listerName: req.body.listerName,
				listerUid: req.body.listerUid,
				gameDate: req.body.gameDate,
				listDate: req.body.listDate,
				opponent: req.body.opponent,
				price: req.body.price,
				quantity: req.body.quantity,
				rowNumber: req.body.rowNumber,
				sectionNumber: req.body.sectionNumber,
				finalBuyer: {},
				buyers: {},
				rating: null,
				review: null,
				sold: false
			})
			.then(function(docRef) {
				console.log("Ticket written with ID: ", docRef.id);
				res.send(docRef);
			})
			.catch(function(error) {
				console.error("Error adding ticket: ", error);
			});
	});
});

exports.getBuyerHistory = functions.https.onRequest((req, res) => {
	let buyHistory = {};
	cors(req, res, () => {
		db.collection("tickets")
			.get()
			.then(response => {
				response.forEach(doc => {
					let ticket = doc.data();
					if (ticket.buyers[req.body.buyerUid]) {
						buyHistory[doc.id] = {
							...ticket.buyers[req.body.buyerUid],
							...ticket
						};
					}
				});

				res.send(buyHistory);
			});
	});
});

exports.buyerReviewTicket = functions.https.onRequest((req, res) => {
	cors(req, res, () => {
		db.collection("tickets")
			.doc(req.body.ticketId)
			.set(
				{
					review: req.body.reviewContainer.review,
					rating: req.body.reviewContainer.rating
				},
				{ merge: true }
			)
			.then(() => {
				res.send("completed buyer reivew ticket");
			});
	});
});

exports.getListerTickets = functions.https.onRequest((req, res) => {
	cors(req, res, () => {
		let ticketHolder = {};
		db.collection("tickets")
			.where("listerUid", "==", req.body.uid)
			.get()
			.then(listerTickets => {
				listerTickets.forEach(doc => {
					ticketHolder[doc.id] = doc.data();
				});

				res.send(ticketHolder);
			});
	});
});

exports.setFinalBuyer = functions.https.onRequest((req, res) => {
	cors(req, res, () => {
		db.collection("tickets")
			.doc(req.body.ticketId)
			.set(
				{
					finalBuyer: req.body.buyerInfo
				},
				{
					merge: true
				}
			);

		res.send("set final buyer!");
	});
});

exports.editTicket = functions.https.onRequest((req, res) => {
	cors(req, res, () => {
		db.collection("tickets")
			.doc(req.body.ticketId)
			.update({
				sectionNumber: req.body.sectionNumber,
				rowNumber: req.body.rowNumber,
				price: req.body.price
			});

		res.send("edited tickets");
	});
});

// exports.test = functions.https.onRequest((req, res)=>{
// 	db.collection("Users").doc("firestore test").set(req.query, {merge: true})
// })
