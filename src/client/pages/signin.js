import React, { useContext } from "react"
import { TenantContext } from "./_app"
import router from "next/router"

export default () => {
	const { firestore, firebase, auth } = useContext(TenantContext)
	const authenticate = (provider) => {
		const authProvider = new firebase.auth[`${provider}AuthProvider`]()
		auth.signInWithPopup(authProvider)
			.then((result) => {
				const authUser = {
					uid: result.user.uid,
					email: result.user.uid,
					name: result.user.displayName,
					photo: result.user.photoURL,
				}
				authHandler(authUser)
			})
			.catch((err) => console.log(err))

		const authHandler = async (authUser) => {
			// check if user exists in user Collection
			console.log(authUser)
			await firestore
				.collection("users")
				.doc(authUser.uid)
				.get()
				.then((querySnapshot) => {
					if (!querySnapshot == null) {
						// if yes go to home page
						router.push("/")
					} else {
						// if no add the user adn then go to home page
						firestore
							.collection("users")
							.add(authUser)
							.then((createdUser) => router.push("/"))
					}
				})
		}
	}
	return (
		<button onClick={() => authenticate("Google")}>
			Sign in with Google
		</button>
	)
}
