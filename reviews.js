import {initializeApp}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";


import {

getFirestore,

collection,

getDocs,

orderBy,

query

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";





const firebaseConfig = {

  apiKey: "AIzaSyAUxwj4JVPWAz3oDjPTSaEUot49pHxmWQg",

  authDomain: "tujjesafari-dbda9.firebaseapp.com",

  projectId: "tujjesafari-dbda9",

  storageBucket: "tujjesafari-dbda9.firebasestorage.app",

  messagingSenderId: "39777982092",

  appId: "1:39777982092:web:bc488a73cf7bb637204da9",

  measurementId: "G-2PP6P43TER"
};



const app=initializeApp(firebaseConfig);


const db=getFirestore(app);



const box=document.getElementById("reviews");



const q=query(
collection(db,"reviews"),
orderBy("date","desc")
);



const data=await getDocs(q);



box.innerHTML="";



data.forEach(doc=>{


let r=doc.data();


box.innerHTML+=`

<div class="review-card">


<h3>${r.name}</h3>

<p>${"⭐".repeat(r.rating)}</p>

<p>${r.review}</p>

<small>${r.country}</small>


</div>

`;


});
