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
				<TopNav />
				<Inner className="content">{children}</Inner>
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
display: grid;
min-height: 100vh;
grid-template-rows: auto 1fr auto;
`

const Inner = styled.div`
	max-width: ${(props) => props.theme.maxWidth};
	margin: 0 auto;
	padding: 2rem;
`

export default Page
