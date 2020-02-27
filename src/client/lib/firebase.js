import React, { createContext, useEffect, useState } from "react"

const FirebaseContext = createContext(null)
const UserContext = createContext(null)
export { FirebaseContext, UserContext }

export default ({ children, url }) => {
	const [firebase, setFirebase] = useState(null)
	const [isMagicLink, setIsMagicLink] = useState(null)
	const [user, setUser] = useState(null)

	const initializeFirebase = () => {
		const app = require("firebase/app")
		require("firebase/analytics")
		require("firebase/auth")
		require("firebase/firestore")
		require("firebase/functions")
		if (!app.apps.length) {
			app.initializeApp({
				apiKey: process.env.FIREBASE_API_KEY_FUE,
				authDomain: process.env.FIREBASE_AUTH_DOMAIN_FUE,
				databaseURL: process.env.FIREBASE_DATABASE_URL_FUE,
				projectId: process.env.FIREBASE_PROJECT_ID_FUE,
				storageBucket: process.env.FIREBASE_STORAGE_BUCKET_FUE,
				messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID_FUE,
				appId: process.env.FIREBASE_APP_ID_FUE,
				measurementId: process.env.FIREBASE_MEASUREMENT_ID_FUE,
			})
			app.analytics()
			if (process.env.FIREBASE_FUNCTIONS_EMULATOR_URL) {
				app.functions().useFunctionsEmulator(
					process.env.FIREBASE_FUNCTIONS_EMULATOR_URL
				)
			}
			setFirebase(app)
		}
	}

	const magicLogin = () => {
		if (firebase) {
			setIsMagicLink((l) =>
				firebase.auth().isSignInWithEmailLink(window.location.href)
			)
		}
	}

	const monitorAuthState = () => {
		if (isMagicLink === false) {
			const unsubscribe = firebase
				.auth()
				.onAuthStateChanged((firebaseUser) => {
					if (firebaseUser === null) {
						firebase.auth().signInAnonymously()
					} else {
						setUser((u) => {
							return {
								email: firebaseUser.email,
								emailVerified: firebaseUser.emailVerified,
								isAnonymous: firebaseUser.isAnonymous,
								uid: firebaseUser.uid,
							}
						})
					}
				})
			return () => unsubscribe()
		}
	}

	useEffect(initializeFirebase, [])
	useEffect(magicLogin, [firebase])
	useEffect(monitorAuthState, [isMagicLink])

	if (firebase && isMagicLink) {
		// return <MagicLinkVerification firebase={firebase} />
		return <p>Magic link...</p>
	}

	return (
		<FirebaseContext.Provider value={firebase}>
			<UserContext.Provider value={user}>{children}</UserContext.Provider>
		</FirebaseContext.Provider>
	)
}
