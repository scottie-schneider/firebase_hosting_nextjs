"use strict"

const admin = require("firebase-admin")

const firestore = require("@google-cloud/firestore") // const accountSid = process.env.TWILIO_ACCOUNT_SID
// const authToken = process.env.TWILIO_AUTH_TOKEN
// bring in moment

const moment = require("moment")

moment().format()
module.exports = {
  run: async (context) => {
    // bring in twilio
    // get the twilio account sid and auth token from the firebase object
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
    const { TWILIO_AUTH_TOKEN, TWILIO_ACCOUNT_SID } = tenantData

    const client = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN) // Look for all the pendingEvents in the database who's time is due
    // send texts
    const sendText = (event) => {
      try {
        client.messages
          .create({
            body: event.message,
            from: "+18433766861",
            to: "+15128176776",
          })
          .then((message) => console.log(message.sid))
          .catch((e) => {
            console.error("Got an error:", e.code, e.message)
          })
      } catch (err) {
        console.log(err)
      }
    }

    const sendEmail = (event) => {
      console.log("send email")
      return
    }

    const sendRVM = (event) => {
      console.log("send rvm")
      return
    }

    const time = moment()
      .utc()
      .format("X")

    try {
      const batch = admin.firestore().batch()
      const eventsRef = admin.firestore().collection("pendingEvents")
      const pendingEvents = await admin
        .firestore()
        .collection("pendingEvents")
        .where("didRun", "==", false)
        .where("scheduled", "<", time)
        .get()
      console.log(time)

      pendingEvents.forEach((event) => {
        eventsRef.doc(event.id).update({
          didRun: true,
        })
        const eventData = event.data() // run the text on them

        switch (eventData.type) {
          case "text":
            sendText(eventData)
            break
          case "email":
            sendEmail(eventData)
            break
          case "rvm":
            sendRVM(eventData)
            break
        }
      })
      await batch.commit()
      return
    } catch (err) {
      return null
      console.log(err)
    }
  },
}
//# sourceMappingURL=campaignEvents.js.map
