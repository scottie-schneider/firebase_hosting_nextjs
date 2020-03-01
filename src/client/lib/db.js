// Initialize Firebase
const firebase = require("firebase/app")
// require("firebase/analytics");
const auth = require("firebase/auth")
require("firebase/firestore")
require("firebase/functions")
require("firebase/storage")

const db = (url) => {
	let config = {}
	if (url == "us-central1-follow-up-edge-backend.cloudfunctions.net") {
		config = {
			apiKey: process.env.FIREBASE_API_KEY_FUE,
			authDomain: process.env.FIREBASE_AUTH_DOMAIN_FUE,
			databaseURL: process.env.FIREBASE_DATABASE_URL_FUE,
			projectId: process.env.FIREBASE_PROJECT_ID_FUE,
			storageBucket: process.env.FIREBASE_STORAGE_BUCKET_FUE,
			messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID_FUE,
			appId: process.env.FIREBASE_APP_ID_FUE,
			measurementId: process.env.FIREBASE_MEASUREMENT_ID_FUE,
		}
	} else if (url == "us-central1-wl-test-1.cloudfunctions.net") {
		config = {
			apiKey: process.env.FIREBASE_API_KEY_1,
			authDomain: process.env.FIREBASE_AUTH_DOMAIN_1,
			databaseURL: process.env.FIREBASE_DATABASE_URL_1,
			projectId: process.env.FIREBASE_PROJECT_ID_1,
			storageBucket: process.env.FIREBASE_STORAGE_BUCKET_1,
			messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID_1,
			appId: process.env.FIREBASE_APP_ID_1,
			measurementId: process.env.FIREBASE_MEASUREMENT_ID_1,
		}
	} else if (url == "us-central1-wl-test-2.cloudfunctions.net") {
		config = {
			aapiKey: process.env.FIREBASE_API_KEY_2,
			authDomain: process.env.FIREBASE_AUTH_DOMAIN_2,
			databaseURL: process.env.FIREBASE_DATABASE_URL_2,
			projectId: process.env.FIREBASE_PROJECT_ID_2,
			storageBucket: process.env.FIREBASE_STORAGE_BUCKET_2,
			messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID_2,
			appId: process.env.FIREBASE_APP_ID_2,
			measurementId: process.env.FIREBASE_MEASUREMENT_ID_2,
		}
	} else {
		config = {
			apiKey: process.env.FIREBASE_API_KEY_FUE,
			authDomain: process.env.FIREBASE_AUTH_DOMAIN_FUE,
			databaseURL: process.env.FIREBASE_DATABASE_URL_FUE,
			projectId: process.env.FIREBASE_PROJECT_ID_FUE,
			storageBucket: process.env.FIREBASE_STORAGE_BUCKET_FUE,
			messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID_FUE,
			appId: process.env.FIREBASE_APP_ID_FUE,
			measurementId: process.env.FIREBASE_MEASUREMENT_ID_FUE,
		}
	}
	try {
		firebase.initializeApp(config)
	} catch (err) {
		// we skip the "already exists" message which is
		// not an actual error when we're hot-reloading
		if (!/already exists/.test(err.message)) {
			console.error("Firebase initialization error", err.stack)
		}
	}
	return firebase
}

export default db
