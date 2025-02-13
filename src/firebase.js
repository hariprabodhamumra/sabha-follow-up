import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAG3R1ppQ9OpHzV_gg-Uf-6gdFCAeQt7h8",
  authDomain: "sabha-follow-up-a687b.firebaseapp.com",
  projectId: "sabha-follow-up-a687b",
  storageBucket: "sabha-follow-up-a687b.firebasestorage.app",
  messagingSenderId: "677913653753",
  appId: "1:677913653753:web:2cf69b41ffe208a8a3cd28"
  // databaseURL: "https://sabha-follow-up-a687b-default-rtdb.firebaseio.com"
};

export const app = initializeApp(firebaseConfig);
