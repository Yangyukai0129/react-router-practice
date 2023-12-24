import React from "react";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    doc,
    getDocs,
    getDoc,
    query,
    where
} from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA9WvL2tvdCB_BB60wbo2xqHouzXjGBDXc",
    authDomain: "vanlife-51fe0.firebaseapp.com",
    projectId: "vanlife-51fe0",
    storageBucket: "vanlife-51fe0.appspot.com",
    messagingSenderId: "1060781964748",
    appId: "1:1060781964748:web:15670fd828b6eed721f169"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const vansCollectionRef = collection(db, 'vans');
const auth = getAuth(app);

export async function getVans() {
    const querySnapshot = await getDocs(vansCollectionRef)
    const dataArr = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return dataArr
}

export async function getVan(id) {
    const docRef = doc(db, 'vans', id)
    const vanSnapshot = await getDoc(docRef)
    return {
        ...vanSnapshot.data(),
        id: vanSnapshot.id
    }
}

export default async function Auth(email, password) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    return user
}

export async function getHostVans() {
    const storedUser = localStorage.getItem('user')
    const parsedUser = JSON.parse(storedUser)
    if (!parsedUser || !parsedUser.uid) {
        // 处理用户未登录或无效的情况
        return [];
    }
    const uid = parsedUser.uid
    const q = query(vansCollectionRef, where("UID", "==", uid))
    const querySnapshot = await getDocs(q)
    const dataArr = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return dataArr
}