import React, { useState, useEffect, useContext } from "react"
import db from "../lib/db"
import absoluteUrl from "next-absolute-url"
import withAuth from "../components/withAuth"
import { TenantContext } from "./_app"
const Home = ({ messages, req }) => {
	const { firestore, auth } = useContext(TenantContext)
	const [leadMessages, setLeadMessages] = useState(messages)

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
	const fetchMessages = async () => {
		const messages = []
		try {
			await firestore
				.collection("messages")
				.where("userId", "==", 1)
				.where("leadId", "==", 1)
				.get()
				.then((documentSet) => {
					if (documentSet !== null) {
						documentSet.forEach((doc) => {
							messages.push({
								id: doc.id,
								...doc.data(),
							})
						})
						setLeadMessages(messages)
					}
					return messages
				})
		} catch (err) {
			console.log("allen we had an error")
			console.log(err)
		}
	}

	useEffect(() => {
		fetchMessages()
		const unsubscribe = firestore
			.collection("messages")
			.onSnapshot(fetchMessages)
		// handles the cleanup
		return () => {
			unsubscribe()
		}
	}, [])

	return (
		<div>
			<h1>Home Page</h1>
			{leadMessages.map((message) => (
				<p>{message.message}</p>
			))}

			<button onClick={handleLogout}>Logout</button>
		</div>
	)
}

Home.getInitialProps = async function({ req, res }) {
	const absolute = absoluteUrl(req)
	let messages = []
	const firebase = db(absolute.host)
	// step one, seed initial messages
	await firebase
		.firestore()
		.collection("messages")
		.where("userId", "==", 1)
		.where("leadId", "==", 1)
		.get()
		.then((documentSet) => {
			if (documentSet !== null) {
				documentSet.forEach((doc) => {
					messages.push({
						id: doc.id,
						...doc.data(),
					})
				})
			}
		})
	return { messages }
}

export default withAuth(Home)
