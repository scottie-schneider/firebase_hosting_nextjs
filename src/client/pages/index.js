import React, { useState, useEffect, useContext } from "react"
import db from "../lib/db"
import absoluteUrl from "next-absolute-url"
import withAuth from "../components/withAuth"
import { TenantContext } from "./_app"
const Home = ({ messages, req }) => {
	const { firestore, auth } = useContext(TenantContext)
	// const [userState, setUserState] = useState("no")

	// const handleSignIn = () => {
	// 	db.firebase
	// 		.auth()
	// 		.signInWithEmailAndPassword("scott@warcat.co", "speje33ma*")
	// 		.catch(function(error) {
	// 			// Handle Errors here.
	// 			var errorCode = error.code
	// 			var errorMessage = error.message
	// 			console.log(errorCode)
	// 			console.log(errorMessage)
	// 		})
	// }

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

	// useEffect(() => {
	// 	auth.onAuthStateChanged((authUser) => {
	// 		console.log(authUser)
	// 		if (authUser) {
	// 			setUserState("SIGNED_IN")
	// 		} else {
	// 			router.push("/")
	// 		}
	// 	})
	// }, [])
	// const [messages, setMessages] = useState([])

	// useEffect(() => {
	//   const unsubscribe = db
	//     .firestore()
	//     .collection("messages")
	//     .onSnapshot((snapshot) => {
	//       if (snapshot.size) {
	//         // we have something
	//         let updatedMessages = []
	//         snapshot.forEach((doc) => {
	//           updatedMessages.push({ id: doc.id, ...doc.data() })
	//         })
	//         setMessages((p) => updatedMessages)
	//       } else {
	//         // it's empty
	//         console.log("ERROR!")
	//       }
	//     })
	//   // handles the cleanup
	//   return () => {
	//     unsubscribe()
	//   }
	// }, [])

	return (
		<div>
			<h1>Home Page</h1>
			{messages.map((message) => (
				<p>{message.original}</p>
			))}

			<button onClick={handleLogout}>Logout</button>
		</div>
	)
}

Home.getInitialProps = async function({ req, res }) {
	const absolute = absoluteUrl(req)
	let messages = []
	const firebase = db(absolute.host)

	await firebase
		.firestore()
		.collection("messages")
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
