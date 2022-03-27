const admin = require("firebase-admin");
// const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("../sdk.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ecommerce.firebaseio.com",
});

module.exports = admin.app;
