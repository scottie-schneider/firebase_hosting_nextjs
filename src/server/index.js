const admin = require("firebase-admin")
const { https, pubsub } = require("firebase-functions")
admin.initializeApp()

import next from "next"

// callable functions
exports.testEmail = https.onCall(async (data, context) => {
  console.log("heyyyyy email")
})
const c = require("./callable")
exports.sendTestEmail = https.onCall(c.emails.sendEmail)
exports.hi = https.onCall(c.emails.hi)

// scheduled functions
const s = require("./scheduled")
exports.runCampaignEvents = pubsub
  .schedule("every 1 mins")
  .onRun(s.campaignEvents.run)

const cors = require("cors")({ origin: true })
// this is the function that renders our NextJS pages

const dev = process.env.NODE_ENV !== "production"
const app = next({
  dev,
  // the absolute directory from the package.json file that initialises this module
  // IE: the absolute path from the root of the Cloud Function
  conf: { distDir: "dist/client" },
})
const handle = app.getRequestHandler()

const server = https.onRequest((request, response) => {
  // log the page.js file or resource being requested
  console.log("File: " + request.originalUrl)
  return app.prepare().then(() => handle(request, response))
})

exports.nextjs = {
  server,
}

exports.receiveEmail = https.onRequest((req, res) => {
  cors(req, res, () => {
    // TODO is this a new message or an old one?yarn ad

    // TODO is there another way besides the email we can id who is sending it?

    // the text reply
    console.log("********* stripped text reply ***********")
    // only if the email is a reply!
    console.log(req.body.StrippedTextReply)

    console.log("******** TEXT BODY **********")
    console.log(req.body.TextBody)
    console.log("subject")
    console.log(req.body.Subject)
    // who it's from
    console.log("from")
    console.log(req.body.From)
    // who it's to (the client)
    console.log("to")
    console.log(req.body.To)

    console.log("************** html  **************")
    console.log(req.body.HtmlBody)
    // find the client, add a message on that lead's history. Include HTML and text

    return res.status(200).send({ message: "success" })
  })
})
