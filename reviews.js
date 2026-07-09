import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    getFirestore,
    collection,
    getDocs,
    query,
    orderBy
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyAUxwj4JVPWAz3oDjPTSaEUot49pHxmWQg",
    authDomain: "tujjesafari-dbda9.firebaseapp.com",
    projectId: "tujjesafari-dbda9",
    storageBucket: "tujjesafari-dbda9.firebasestorage.app",
    messagingSenderId: "39777982092",
    appId: "1:39777982092:web:bc488a73cf7bb637204da9",
    measurementId: "G-2PP6P43TER"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Reviews Container
const reviewsContainer = document.getElementById("reviews");

async function loadReviews() {

    try {

        reviewsContainer.innerHTML = "<p>Loading reviews...</p>";

        const q = query(
            collection(db, "reviews"),
            orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(q);

        reviewsContainer.innerHTML = "";

        if (snapshot.empty) {
            reviewsContainer.innerHTML =
                "<p>No reviews yet. Be the first to leave a review!</p>";
            return;
        }

        snapshot.forEach((doc) => {

            const review = doc.data();

            const name = review.name || "Guest";
            const message = review.review || review.text || "";
            const rating = Number(review.rating || 5);
            const country = review.country || "";

            reviewsContainer.innerHTML += `
                <div class="review-card">

                    <h3>${name}</h3>

                    <p style="color:#d4af37;font-size:20px;">
                        ${"⭐".repeat(rating)}
                    </p>

                    <p>${message}</p>

                    ${country ? `<small>${country}</small>` : ""}

                </div>
            `;

        });

    } catch (error) {

        console.error(error);

        reviewsContainer.innerHTML =
            "<p>Unable to load reviews.</p>";

    }

}

// Load Reviews
loadReviews();
