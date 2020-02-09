// Initialize Firebase
const firebase = require("firebase/app");
// require("firebase/analytics");
require("firebase/auth");
require("firebase/firestore");
require("firebase/functions");
require("firebase/storage");
let first, second;
const db = url => {
  if (!firebase.apps.length) {
    first = firebase.initializeApp(
      {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.FIREBASE_DATABASE_URL,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID
      },
      "first"
    );
    second = firebase.initializeApp(
      {
        apiKey: "AIzaSyAhu9Aptqfs6Q_xu9HS7jMvqpGcQkQCqT8",
        authDomain: "wl-test-1.firebaseapp.com",
        databaseURL: "https://wl-test-1.firebaseio.com",
        projectId: "wl-test-1",
        storageBucket: "wl-test-1.appspot.com",
        messagingSenderId: "64946981609",
        appId: "1:64946981609:web:a2335047c9e6c901113e78",
        measurementId: "G-NMP46JDG1E"
      },
      "second"
    );
    // firebase.analytics();
  }
  // return the appropriate object once all apps are initialized?
  if (
    url == "us-central1-follow-up-edge-backend.cloudfunctions.net" ||
    url == "localhost:5000"
  ) {
    return first;
  }
  if (url == "us-central1-wl-test-1.cloudfunctions.net") {
    return second;
  }
};

export default db;
