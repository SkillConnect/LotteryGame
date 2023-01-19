import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
const firebaseConfig = {
  apiKey: "AIzaSyCVdHkw_mbnVXfxNKa5rmOBXl_IgAbpX-8",
  authDomain: "lottery-game-form.firebaseapp.com",
  projectId: "lottery-game-form",
  storageBucket: "lottery-game-form.appspot.com",
  messagingSenderId: "634618825667",
  appId: "1:634618825667:web:5ddbb9aee28e4a58d70b76",
};

export const app = initializeApp(firebaseConfig);

export function failMessage(err) {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text:
      err ||
      "Something went wrong! Please try again later Or reach us via email/phone.",
    timerProgressBar: true,
    timer: 5000,
    confirmButtonColor: "#1E75BB",
  }).then(() => location.reload());
}

export function successMessage() {
  Swal.fire({
    icon: "success",
    title: "Submitted!",
    text: "Thank you for reaching out to us! Our team will get back to you soon",
    timerProgressBar: true,
    timer: 5000,
    confirmButtonColor: "#1E75BB",
  }).then(() => location.reload());
}
