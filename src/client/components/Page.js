import React, { useState, useEffect, useContext, createContext } from "react"
import styled, { ThemeProvider } from "styled-components"
import { TenantContext } from "../pages/_app"
import Head from "./Head/Head"

const UserContext = createContext(null)
export { UserContext }

import { theme } from "./theme"
import GlobalStyles from "./GlobalStyles"

const Page = ({ children }) => {
	const [userState, setUserState] = useState("no")
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
		auth.signOut()
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
				setUserState("SIGNED_IN")
			}
		})
	}, [])

	if (userState == "no") {
		return <button onClick={handleSignIn}>Sign In using google</button>
	}
	if (userState == "SIGNED_IN") {
		return (
			<ThemeProvider theme={theme}>
				<UserContext.Provider value={userState}>
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
