import React, { useState, useEffect, useContext } from "react"
import db from "../lib/db"
import { TenantContext } from "./_app"
import styled from "styled-components"
import absoluteUrl from "next-absolute-url"
const Home = ({ data, req }) => {
	const {
		value: { tagline, imageURL, hostUrl },
	} = useContext(TenantContext)
	const { db: db } = useContext(TenantContext)
	const [messages, setMessages] = useState(data)
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
		</div>
	)
}

Home.getInitialProps = async function({ req, res }) {
	const absolute = absoluteUrl(req)
	let data = []
	const querySnapshot = await db(absolute.host)
		.firestore()
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
