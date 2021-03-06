import { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle`
	html {
		box-sizing: border-box;
		font-size: 10px;
		height: 100vh;
      overflow: hidden;
	}
	*, *:before, *:after {
		box-sizing: inherit;
	}
	html, body {
		height: 100%;
	}

	.content {
		flex: 1 0 auto;
	}
	.footer {
		flex-shrink: 0;
	}

	body {
	background-color: white;
	font-family: sans-serif;
	font-weight: 400;
	line-height: 1.65;
	color: #333;
	margin: 0;
        height: 100%;
	}

	p {margin-bottom: 1.15rem;}

	h1, h2, h3, h4, h5 {
		margin: 2.75rem 0 1.05rem;
		font-family: sans-serif;
		font-weight: 400;
		line-height: 1.15;
	}

	h1 {
		margin-top: 0;
		font-size: 4.209em;
	}

	h2 {font-size: 3.157em;}

	h3 {font-size: 2.369em;}

	h4 {font-size: 1.777em;}

	h5 {font-size: 1.333em;}

	small, .text_small {font-size: 0.75em;}
`

export default GlobalStyles
