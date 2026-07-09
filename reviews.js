import {initializeApp}
from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";


import {

getFirestore,
collection,
addDoc,
serverTimestamp

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";





const firebaseConfig = {

apiKey:"AIzaSyAUxwj4JVPWAz3oDjPTSaEUot49pHxmWQg",

authDomain:"tujjesafari-dbda9.firebaseapp.com",

projectId:"tujjesafari-dbda9",

storageBucket:"tujjesafari-dbda9.firebasestorage.app",

messagingSenderId:"39777982092",

appId:"1:39777982092:web:bc488a73cf7bb637204da9"

};




const app=initializeApp(firebaseConfig);

const db=getFirestore(app);





window.submitReview=async function(){


let name=document.getElementById("name").value;

let country=document.getElementById("country").value;

let rating=document.getElementById("rating").value;

let review=document.getElementById("review").value;



if(!name || !review){

alert("Please complete your review");

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


alert("⭐ Thank you for your review!");

document.querySelector(".container").reset;


}

catch(error){

console.log(error);

alert("Error sending review");

}


};





const reviewLink =
"https://www.tujjesafari.com/review.html";



window.shareWhatsApp=function(){

window.open(
"https://wa.me/?text="+
encodeURIComponent(reviewLink)
);

}



window.shareFacebook=function(){

window.open(

"https://www.facebook.com/sharer/sharer.php?u="+
encodeURIComponent(reviewLink)

);

}



window.copyLink=function(){

navigator.clipboard.writeText(reviewLink);

alert("Review link copied");

}
