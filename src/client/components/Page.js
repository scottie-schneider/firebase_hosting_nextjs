import React, { useState, useEffect, useContext, createContext } from "react"
import styled, { ThemeProvider } from "styled-components"
import { TenantContext } from "../pages/_app"
import Head from "./Head/Head"
import TopNav from "./TopNav/TopNav"
const UserContext = createContext(null)
export { UserContext }

import { theme } from "./theme"
import GlobalStyles from "./GlobalStyles"

const Page = ({ children }) => {
	const { auth } = useContext(TenantContext)
	const [user, setUser] = useState(null)
	useEffect(() => {
		auth.onAuthStateChanged((authUser) => {
			setUser(authUser)
		})
	}, [])
	return (
		<ThemeProvider theme={theme}>
			<UserContext.Provider value={user}>
				<StyledPage>
					<GlobalStyles />
					<Head />
					<TopNav />
					{children}
				</StyledPage>
			</UserContext.Provider>
		</ThemeProvider>
	)
}

const StyledPage = styled.div`
/* background: ${(props) => props.theme.red}; */
background: white;
color: ${(props) => props.theme.black};
min-height: 100vh;
`

export default Page
