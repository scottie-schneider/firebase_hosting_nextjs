import styled, { ThemeProvider } from "styled-components"

import Head from "./Head/Head"
import TopNav from "./TopNav/TopNav"

import { theme } from "./theme"
import GlobalStyles from "./GlobalStyles"

const Page = ({ children }) => {
	return (
		<ThemeProvider theme={theme}>
			<StyledPage>
				<GlobalStyles />
				<Head />
				{/* <TopNav /> */}
				{children}
			</StyledPage>
		</ThemeProvider>
	)
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
