const firebase = require("firebase");
const firestore = require("firebase/firestore");
const auth = require("firebase/auth");
// const admin = require("firebase-admin");
// admin.initializeApp();
// firebase.initializeApp({
// 	apiKey: "AIzaSyBAtJz7hFRTKQsdD2d5qHM5mm0r7EpTg3s",
// 	authDomain: "raptorsticket-9ec22.firebaseapp.com",
// 	databaseURL: "https://raptorsticket-9ec22.firebaseio.com",
// 	projectId: "raptorsticket-9ec22"
// });
const dotenv = require("dotenv");
dotenv.config();

firebase.initializeApp({
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID
});

const db = firebase.firestore();
//auth = firebase.auth();

// 			------------- 01 USERS -------------
// 			--- Creates new user account ---

const createUser = function(userInfo) {
	// const store = {
	// 	uid: userInfo.uid || null,
	// 	displayName: userInfo.displayName || null,
	// 	phoneNumber: userInfo.phoneNumber || null,
	// 	emailVerified: userInfo.emailVerified || null,
	// 	photoURL: userInfo.photoURL || null,
	// 	email: userInfo.email || null,
	// 	isAnonymous: userInfo.isAnonymous,
	// 	provider:
	// 		//userInfo.providerData[userInfo.providerData.length - 1].providerId ||
	// 		null
	// };
	const store = {
		test: "test"
	};

	db.collection("Users")
		.doc("firestore test")
		.set(store, { merge: true });
};

module.exports = { createUser };
// export const createUser = async function(userInfo) {
// 	console.log("creating user...");
// 	const store = {
// 		uid: userInfo.uid || null,
// 		displayName: userInfo.displayName || null,
// 		phoneNumber: userInfo.phoneNumber || null,
// 		emailVerified: userInfo.emailVerified || null,
// 		photoURL: userInfo.photoURL || null,
// 		email: userInfo.email || null,
// 		isAnonymous: userInfo.isAnonymous,
// 		provider:
// 			userInfo.providerData[userInfo.providerData.length - 1].providerId || null
// 	};
// 	let prompt = await db
// 		.collection("Users")
// 		.doc(userInfo.uid)
// 		.set(store, { merge: true });

// 	console.log("this shuold work", prompt);
// };

// export const addUserInfo = async function(userInput) {};

// // 			--- Display user info for profile ---

// export const getUser = async function(userId) {
// 	try {
// 		const response = await db
// 			.collection("Users")
// 			.doc(userId)
// 			.get();
// 		return response;
// 	} catch (err) {
// 		console.log(err);
// 		return err;
// 	}
// };

// //      --- Display user's reviews on profile ---
// export const getUserReviews = function(username) {
// 	db.collection("tickets")
// 		.where("listerName", "==", username)
// 		.where("sold", "==", true)
// 		.get()
// 		.then(querySnapshot => {
// 			querySnapshot.forEach(doc => {
// 				console.log(doc.data());
// 			});
// 		})
// 		.catch(error => {
// 			console.log("Error getting user reviews: ", error);
// 		});
// };

// //			--- Verified User:  checks if user owns a verified account ---

// export const checkUserVerification = function(userId) {
// 	db.collection("users")
// 		.doc(userId)
// 		.where("verfied", "==", true)
// 		.get()
// 		.then(document => {
// 			console.log(document.data());
// 		})
// 		.catch(error => {
// 			console.log("Error user not verified", error);
// 		});
// };

// //			--- Changes user to verified ---

// export const verifyUser = function(userId) {
// 	db.collection("users")
// 		.doc(userId)
// 		.update({
// 			verified: true
// 		})
// 		.then(function() {
// 			console.log("User set to verfied!");
// 		})
// 		.catch(function(error) {
// 			console.error("Error changing user: ", error);
// 		});
// };

// //      --- Changes user display name ---

// export const changeName = function(name, userId) {
// 	db.collection("users")
// 		.doc(userId)
// 		.update({ displayName: name })
// 		.then(function() {
// 			console.log("Username changed!");
// 		})
// 		.catch(function(error) {
// 			console.error("Error changing username: ", error);
// 		});
// };

// //		  ---	User Sell History ---

// export const getUserSellHistory = function(username) {
// 	db.collection("tickets")
// 		.where("listerName", "==", username)
// 		.where("sold", "==", true)
// 		.get()
// 		.then(querySnapshot => {
// 			querySnapshot.forEach(doc => {
// 				console.log(doc.data());
// 			});
// 		})
// 		.catch(error => {
// 			console.log("Error getting user sell history: ", error);
// 		});
// };

// //			--- User Buy History ---

// export const getUserBuyHistory = function(username) {
// 	db.collection("tickets")
// 		.where("purchaserName", "==", username)
// 		.where("sold", "==", true)
// 		.get()
// 		.then(querySnapshot => {
// 			querySnapshot.forEach(doc => {
// 				console.log(doc.data());
// 			});
// 		})
// 		.catch(error => {
// 			console.log("Error getting user buy history: ", error);
// 		});
// };

// //      --- Insert review/rating in buy history ---

// export const buyerReviewTicket = async function(ticketId, reviewContainer) {
// 	try {
// 		let ticket = await db
// 			.collection("tickets")
// 			.doc(ticketId)
// 			.set(
// 				{ review: reviewContainer.review, rating: reviewContainer.rating },
// 				{ merge: true }
// 			);
// 	} catch (err) {
// 		console.log(err);
// 	}
// };

// export const reviewTicket = function(
// 	username,
// 	gameDate,
// 	opponent,
// 	sectionNumber,
// 	rowNumber,
// 	rating,
// 	review
// ) {
// 	db.collection("tickets")
// 		.where("listerName", "==", username)
// 		.where("sectionNumber", "==", sectionNumber)
// 		.where("rowNumber", "==", rowNumber)
// 		.where("gameDate", "==", gameDate)
// 		.where("opponent", "==", opponent)
// 		.update({
// 			rating: rating,
// 			review: review
// 		})
// 		.then(function() {
// 			console.log("Ticket updated with rating: ");
// 		})
// 		.catch(function(error) {
// 			console.error("Error adding rating to ticket: ", error);
// 		});
// };

// //			------------- 02 Marketplace -------------

// //			--- Insert new ticket listing for specific game/date ---

// export const listTicket = function(ticketInfo) {
// 	db.collection("tickets")
// 		.add({
// 			listerName: ticketInfo.listerName,
// 			listerUid: ticketInfo.listerUid,
// 			gameDate: ticketInfo.gameDate,
// 			listDate: ticketInfo.listDate,
// 			opponent: ticketInfo.opponent,
// 			price: ticketInfo.price,
// 			quantity: ticketInfo.quantity,
// 			rowNumber: ticketInfo.rowNumber,
// 			sectionNumber: ticketInfo.sectionNumber,
// 			finalBuyer: {},
// 			buyers: {},
// 			rating: null,
// 			review: null,
// 			sold: false
// 		})
// 		.then(function(docRef) {
// 			console.log("Ticket written with ID: ", docRef.id);
// 		})
// 		.catch(function(error) {
// 			console.error("Error adding ticket: ", error);
// 		});
// };

// // 			--- Buying ticket: update ticket to sold: true and buy ticket from seller ---

// export const updateTicketToSold = function(
// 	username,
// 	sectionNumber,
// 	rowNumber,
// 	gameDate,
// 	opponent
// ) {
// 	db.collection("tickets")
// 		.where("listerName", "==", username)
// 		.where("sectionNumber", "==", sectionNumber)
// 		.where("rowNumber", "==", rowNumber)
// 		.where("gameDate", "==", gameDate)
// 		.where("opponent", "==", opponent)
// 		.update({ sold: true })
// 		.then(function() {
// 			console.log("Ticket updated to sold!");
// 		})
// 		.catch(function(error) {
// 			console.error("Error updating document: ", error);
// 		});
// };

// export const getListerTickets = async function(uid) {
// 	try {
// 		let ticketHolder = {};
// 		let listerTickets = await db
// 			.collection("tickets")
// 			.where("listerUid", "==", uid)
// 			.get();

// 		listerTickets.forEach(doc => {
// 			ticketHolder[doc.id] = doc.data();
// 		});

// 		return ticketHolder;
// 	} catch (err) {
// 		console.log(err);
// 		return err;
// 	}
// };

// //			--- Show available tickets for specific game/date/section ---

// export const getSpecificTicket = function(opponent, date, sectionNumber) {
// 	db.collection("tickets")
// 		.where("opponent", "==", opponent)
// 		.where("gameDate", "==", date)
// 		.where("sectionNumber", "==", sectionNumber)
// 		.where("sold", "==", false)
// 		.get()
// 		.then(querySnapshot => {
// 			querySnapshot.forEach(doc => {
// 				console.log(doc.data());
// 			});
// 		})
// 		.catch(error => {
// 			console.log("Error getting user reviews: ", error);
// 		});
// };

// //			--- Shows all available tickets for a specific game/date ---

// export const getAllTickets = async function(opponent, date) {
// 	let tickets = {};
// 	let ticketArr = await db
// 		.collection("tickets")
// 		.where("opponent", "==", opponent)
// 		.where("gameDate", "==", date)
// 		.where("sold", "==", false)
// 		.get();

// 	ticketArr.forEach(doc => {
// 		tickets[doc.id] = doc.data();
// 		console.log(tickets);
// 	});

// 	return tickets;
// };

// //      --- Insert buyer name and purchase date ---

// export const boughtTicket = function(username, purchaseDate, ticketId) {
// 	db.collection("tickets")
// 		.doc(ticketId)
// 		.update({
// 			purchaserName: username,
// 			purchaseDate: purchaseDate
// 		})
// 		.then(function() {
// 			console.log("Ticket updated with buyer info!");
// 		})
// 		.catch(function(error) {
// 			console.error("Error updating document: ", error);
// 		});
// };

// //			--- Show available tickets for specific game/date/section---

// //			------------- 03 Editing/Deletes -------------

// //      --- Editing listed ticket ---

// export const editTicket = function({
// 	ticketId,
// 	sectionNumber,
// 	rowNumber,
// 	price
// }) {
// 	db.collection("tickets")
// 		.doc(ticketId)

// 		.update({
// 			sectionNumber,
// 			rowNumber,
// 			price
// 		})
// 		.then(function() {
// 			console.log("Ticket edited:", ticketId);
// 		})
// 		.catch(function(error) {
// 			console.error("Error editing ticket: ", error);
// 		});
// };
// export const getTicket = async function(ticketId) {
// 	let ticket = await db
// 		.collection("tickets")
// 		.doc(ticketId)
// 		.get();

// 	console.log(ticket.data());
// 	return ticket.data();
// };

// export const addTicketBuyer = async function(ticketId, buyerUid) {
// 	console.log("ADDING TICKET FROM ADD TICKET BUYER");
// 	let userInfo = await getUser(buyerUid);

// 	db.collection("tickets")
// 		.doc(ticketId)
// 		.set(
// 			{
// 				buyers: { [buyerUid]: { ...userInfo.data(), ticketId } }
// 			},
// 			{ merge: true }
// 		)
// 		.then(function() {
// 			console.log("ticket buyer information added within tickets: ");
// 		})
// 		.catch(console.log);
// };

// export const getBuyers = async function(ticketId) {
// 	try {
// 		let ticket = await db
// 			.collection("tickets")
// 			.doc(ticketId)
// 			.get();
// 		return ticket.data().buyerRequests;
// 	} catch (err) {
// 		console.log(err);
// 	}
// };

// export const setFinalBuyer = async function(ticketId, buyerInfo) {
// 	try {
// 		await db
// 			.collection("tickets")
// 			.doc(ticketId)
// 			.set(
// 				{
// 					finalBuyer: buyerInfo
// 				},
// 				{ merge: true }
// 			);

// 		console.log("added final buyer!:", buyerInfo);
// 	} catch (err) {
// 		console.log(err);
// 	}
// };

// export const getBuyerHistory = async function(buyerUid) {
// 	//console.log("GETBUYER HISTORY TEST ASDFASFASFD");
// 	try {
// 		let buyHistory = {};
// 		//console.log("GETBUYER HISTORY TEST ASDFASFASFD");
// 		let tickets = await db.collection("tickets").get();
// 		//console.log("now aync is completed");
// 		tickets.forEach(doc => {
// 			//console.log(doc.data());
// 			let ticket = doc.data();
// 			if (ticket.buyers[buyerUid]) {
// 				buyHistory[doc.id] = {
// 					...ticket.buyers[buyerUid],
// 					...ticket
// 				};
// 			}
// 		});
// 		console.log(buyHistory);
// 		return buyHistory;
// 	} catch (err) {
// 		console.log(err);
// 	}
// };

// // addTicketBuyer("509wM5SoOPbZSgx0ni6c8sYHSGj2", "0EknLkKhmueP3YFr3zNi");
// //      --- Delete a listed ticket ---

// export const deleteTicket = function(username, ticketId) {
// 	db.collection("tickets")
// 		.doc(ticketId)
// 		.where("listerName", "==", username)
// 		.delete()
// 		.then(function() {
// 			console.log("Ticket successfully deleted!");
// 		})
// 		.catch(function(error) {
// 			console.error("Error removing ticket: ", error);
// 		});
// };
