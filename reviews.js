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





const firebaseConfig={


apiKey:"YOUR_API_KEY",

authDomain:"YOUR_AUTH_DOMAIN",

projectId:"YOUR_PROJECT_ID",

storageBucket:"YOUR_STORAGE_BUCKET",

messagingSenderId:"YOUR_MESSAGING_ID",

appId:"YOUR_APP_ID"


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
