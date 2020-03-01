import React, { useState, useEffect, useContext, createContext } from "react"
import styled, { ThemeProvider } from "styled-components"
import { FirebaseContext } from "../pages/_app"
import Head from "./Head/Head"
import TopNav from "./TopNav/TopNav"
const UserContext = createContext(null)
export { UserContext }

import { theme } from "./theme"
import GlobalStyles from "./GlobalStyles"

const Page = ({ children }) => {
	return (
		<ThemeProvider theme={theme}>
			<StyledPage>
				<GlobalStyles />
				<Head />
				<TopNav />
				{children}
			</StyledPage>
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
