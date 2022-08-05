import Rebase from "re-base";
import firebase from "firebase/app";
import 'firebase/database';
import 'firebase/auth';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyC8bPawuKeEgGF5N2rgm1AgNQoIFpF3X-w",
  authDomain: "top-burgers.firebaseapp.com",
  databaseURL: "https://top-burgers-default-rtdb.firebaseio.com",
 
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;