import { initializeApp } from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getFirestore,
collection,
addDoc,
getDocs,
query,
orderBy,
serverTimestamp
} from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const firebaseConfig = {

apiKey: "AIzaSyAUxwj4JVPWAz3oDjPTSaEUot49pHxmWQg",

authDomain: "tujjesafari-dbda9.firebaseapp.com",

projectId: "tujjesafari-dbda9",

storageBucket: "tujjesafari-dbda9.firebasestorage.app",

messagingSenderId: "39777982092",

appId: "1:39777982092:web:bc488a73cf7bb637204da9"

};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);



/* =========================
   SUBMIT REVIEW
========================= */

window.submitReview = async function(){


const name = document.getElementById("name").value;

const country = document.getElementById("country").value;

const rating = document.getElementById("rating").value;

const review = document.getElementById("review").value;



if(name==="" || review===""){

alert("Please fill in your name and review");

return;

}



try{


await addDoc(collection(db,"reviews"),{

name:name,

country:country,

rating:Number(rating),

review:review,

date:serverTimestamp()

});



alert("⭐ Thank you! Your review has been submitted.");


// clear form

document.getElementById("name").value="";

document.getElementById("country").value="";

document.getElementById("review").value="";



}


catch(error){

console.error("Error saving review:",error);

alert(error.message);

}


};





/* =========================
   LOAD REVIEWS FOR HOMEPAGE
========================= */

const box = document.getElementById("reviewBox");


async function loadReviews(){


if(!box) return;



const q = query(

collection(db,"reviews"),

orderBy("date","desc")

);



const snap = await getDocs(q);



box.innerHTML="";



snap.forEach(doc=>{


let r = doc.data();



box.innerHTML += `

<div class="review-card">

<h3>${r.name}</h3>

<p>${"⭐".repeat(Number(r.rating))}</p>

<p>${r.review}</p>

<small>${r.country}</small>

</div>

`;

});


}



loadReviews();




/* =========================
   SHARE FUNCTIONS
========================= */


window.shareWhatsApp=function(){

let link="https://www.tujjesafaris.com/review.html";

window.open(
"https://wa.me/?text="+encodeURIComponent(link),
"_blank"
);

}



window.shareFacebook=function(){

let link="https://www.tujjesafaris.com/review.html";

window.open(
"https://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent(link),
"_blank"
);

}



window.copyLink=function(){

navigator.clipboard.writeText(
"https://www.tujjesafaris.com/review.html"
);

alert("Review link copied!");

}
