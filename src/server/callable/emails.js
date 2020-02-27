const admin = require("firebase-admin")
const functions = require("firebase-functions")

// ********
// POSTMARK
// ********

module.exports = {
	hi: async (data) => {
		console.log("hi")
	},
	sendEmail: async (data) => {
		let tenantData = {}
		await admin
			.firestore()
			.collection("tenant")
			.limit(1)
			.get()
			.then((docs) => {
				if (docs.empty) {
					return
				}

				docs.forEach((doc) => {
					tenantData = doc.data()
				})
			})

		const postmark = require("postmark")
		const { POSTMARK_API_KEY } = tenantData
		console.log("post mark api key")
		console.log(POSTMARK_API_KEY)
		const client = new postmark.ServerClient(POSTMARK_API_KEY)
		try {
			await client.sendEmail({
				From: "scott@laclave.co",
				To: "scott+lead@laclave.co",
				Subject: "Test",
				TextBody: "Hello from Postmark!",
			})
		} catch (err) {
			console.log(err)
			return err
		}
		return
	},
	sendTestEmail: async (data) => {
		let cards = [1, 2, 3]
		return cards
	},
}

// Send an email:
