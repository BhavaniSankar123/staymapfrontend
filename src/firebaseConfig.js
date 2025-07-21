import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBI8ZbSPf4D8aPD-vkaTueRDUKmkGwfl_k",
  authDomain: "staymap-c1649.firebaseapp.com",
  projectId: "staymap-c1649",
  storageBucket: "staymap-c1649.firebasestorage.app",
  messagingSenderId: "366975124786",
  appId: "1:366975124786:web:54934fc39ec54b5463832b",
  measurementId: "G-VKYJFQD21N"
};

const app = initializeApp(firebaseConfig);

if (process.env.NODE_ENV === "production") {
  getAnalytics(app);
}

export default app;
