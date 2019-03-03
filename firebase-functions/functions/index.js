const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp(functions.config().firebase)

exports.createAccountDoc = functions.auth.user().onCreate( async (user) => {
  const db = admin.firestore();
  const batch = db.batch();

  const userCollection = db.collection('User');
  const userRef = userCollection.doc(user.uid);

  try{
    await batch.set(userRef, { name: '未設定' });

    await batch.commit().then(() => {
    console.log('add user success.');
    })
  }
  catch(e) {
    console.log(`error occurs: ${e}`);
  }
});
