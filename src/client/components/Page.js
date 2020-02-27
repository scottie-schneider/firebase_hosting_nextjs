import React, { useState, useEffect, useContext, createContext } from "react"
import styled, { ThemeProvider } from "styled-components"
import { TenantContext } from "../pages/_app"
import Head from "./Head/Head"

const UserContext = createContext(null)
export { UserContext }

import { theme } from "./theme"
import GlobalStyles from "./GlobalStyles"

const Page = ({ children }) => {
	const [user, setUser] = useState(null)
	const { db: db } = useContext(TenantContext)
	const { auth } = db
	const handleSignIn = () => {
		db.firebase
			.auth()
			.signInWithEmailAndPassword("scott@warcat.co", "speje33ma*")
			.catch(function(error) {
				// Handle Errors here.
				var errorCode = error.code
				var errorMessage = error.message
				console.log(errorCode)
				console.log(errorMessage)
			})
	}

	const handleLogout = () => {
		db.firebase.auth
			.signOut()
			.then(function() {
				alert("Logout successful")
			})
			.catch(function(error) {
				alert("OOps something went wrong check your console")
				console.log(error)
			})
	}

	useEffect(() => {
		auth.onAuthStateChanged((authUser) => {
			console.log(authUser)
			if (authUser) {
				setUser((u) => {
					return {
						email: authUser.email,
						emailVerified: authUser.emailVerified,
						isAnonymous: authUser.isAnonymous,
						uid: authUser.uid,
					}
				})
			} else {
				setUser(null)
			}
		})
	}, [])

	if (!user) {
		return <button onClick={handleSignIn}>Sign In using google</button>
	}
	if (user) {
		return (
			<ThemeProvider theme={theme}>
				<UserContext.Provider value={user}>
					<StyledPage>
						<GlobalStyles />
						<Head />
						{/* <TopNav /> */}
						{children}
					</StyledPage>
				</UserContext.Provider>
			</ThemeProvider>
		)
	}
}

Page.getInitialProps = async ({ pathname, req, res }) => {
	let pageProps = {}
}

const StyledPage = styled.div`
/* background: ${(props) => props.theme.red}; */
background: white;
color: ${(props) => props.theme.black};
min-height: 100vh;
`

export default Page
