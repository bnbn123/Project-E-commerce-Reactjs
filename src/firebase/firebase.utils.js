import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCaBsmnRJr4CXE-JrHQY3lJM0lZ8H18FAg",
    authDomain: "ecom-test-dbs.firebaseapp.com",
    databaseURL: "https://ecom-test-dbs.firebaseio.com",
    projectId: "ecom-test-dbs",
    storageBucket: "ecom-test-dbs.appspot.com",
    messagingSenderId: "655199282804",
    appId: "1:655199282804:web:b16412f344d9a813439321",
    measurementId: "G-EQ98CXSBCT"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    //if userdoesnotexist
    if (!userAuth)  return;

    const userRef= firestore.doc(`users/${userAuth.uid}`);

    const snapShot= await userRef.get();
    if(!snapShot.exists){
        const {displayName, email} = userAuth;
        const createdAt= new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user',error.message)
        }
    }   
    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ promt: 'select_account' });
export const SignInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;