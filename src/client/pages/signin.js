import React, { useContext } from "react"
import { TenantContext } from "./_app"
import router from "next/router"

export default () => {
	const { firebase, auth } = useContext(TenantContext)
	const authenticate = (provider) => {
		const authProvider = new firebase.auth[`${provider}AuthProvider`]()
		auth.signInWithPopup(authProvider)
			.then(() => router.push("/"))
			.catch((err) => console.log(err))
	}
	return (
		<button onClick={() => authenticate("Google")}>
			Sign in with Google
		</button>
	)
}
