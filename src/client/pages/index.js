import React, { useState, useEffect, useContext } from "react"
import db from "../lib/db"
import router from "next/router"
import { TenantContext } from "./_app"
import absoluteUrl from "next-absolute-url"
const Home = ({ data, req }) => {
	const {
		value: { tagline, imageURL, hostUrl },
	} = useContext(TenantContext)
	const { db: db } = useContext(TenantContext)
	const { auth } = db
	console.log(auth)
	const [messages, setMessages] = useState(data)
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
			{data.map((message) => (
				<p>{message.original}</p>
			))}

			<button onClick={handleLogout}>Logout</button>
		</div>
	)
}

Home.getInitialProps = async function({ req, res }) {
	const absolute = absoluteUrl(req)
	let data = []
	const querySnapshot = await db(absolute.host)
		.firebase.firestore()
		.collection("messages")
		.get()
	querySnapshot.forEach((doc) => {
		data.push(doc.data())
		console.log(data)
	})
	return {
		data,
	}
}

export default Home
