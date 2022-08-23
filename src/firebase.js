import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getDatabase } from 'firebase/database'
import { getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBxLJeRRXHjEUzCa6EPzfhiwN772Z_1qtE",
  authDomain: "todoapp-7a969.firebaseapp.com",
  databaseURL: "https://todoapp-7a969-default-rtdb.firebaseio.com",
  projectId: "todoapp-7a969",
  storageBucket: "todoapp-7a969.appspot.com",
  messagingSenderId: "113526617387",
  appId: "1:113526617387:web:60d3bf5413da99500b816e",
  measurementId: "G-WVH9RWBH02"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getDatabase(app);
export const auth = getAuth();