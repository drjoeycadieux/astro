import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// Firebase configuration (replace with your actual Firebase project credentials)
const firebaseConfig = {
    apiKey: "AIzaSyDZV7taFCNWJSq-vQdPFlp0fYkyBrzR_ks",
    authDomain: "webclone-581b7.firebaseapp.com",
    projectId: "webclone-581b7",
    storageBucket: "webclone-581b7.firebasestorage.app",
    messagingSenderId: "934204454708",
    appId: "1:934204454708:web:14aeb7f218ce5c8d4d9761"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Firestore function to save feedback data
export const saveFeedbackToFirestore = async (feedbackData: object) => {
    try {
        const docRef = await addDoc(collection(db, "feedbacks"), feedbackData);
        console.log("Document written with ID: ", docRef.id);
        return docRef.id; // Return document ID for success (can be used for confirmation)
    } catch (e) {
        console.error("Error adding document: ", e);
        throw new Error("Error adding document to Firestore");
    }
};
