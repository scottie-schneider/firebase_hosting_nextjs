import styled from "styled-components"
import Link from "next/link"

const TopNav = () => {
	return (
		<StyledNav>
			<Link href="/">
				<a title="Home Page">Home</a>
			</Link>
			<Link href="/dashboard">
				<a title="Dashboard Page">Dashboard</a>
			</Link>
		</StyledNav>
	)
}

const StyledNav = styled.nav`
	width: 100%;
	display: flex;
	justify-content: space-between;
	padding: 0 10%;
	font-size: 1.6rem;
`

export default TopNav
