import Rebase from "re-base";
import firebase from "firebase/app";
import 'firebase/database'
import 'firebase/auth'

//Тут мы заходили на сайт google firebase, регали проект и в итоге получили эти данные
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAYbi6-RQGgH51uNlsFUXLm_YAh-b4kDSk",
    authDomain: "very-hot-burgers-e3eac.firebaseapp.com",
    projectId: "very-hot-burgers-e3eac",
    storageBucket: "very-hot-burgers-e3eac.appspot.com",
    messagingSenderId: "403024508952",
    appId: "1:403024508952:web:2a32ac9e18b956dbb02b6d"
})

const base = Rebase.createClass(firebaseApp.database());

export {firebaseApp};
export default base;