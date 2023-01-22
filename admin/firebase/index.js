import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCVdHkw_mbnVXfxNKa5rmOBXl_IgAbpX-8",
    authDomain: "lottery-game-form.firebaseapp.com",
    projectId: "lottery-game-form",
    storageBucket: "lottery-game-form.appspot.com",
    messagingSenderId: "634618825667",
    appId: "1:634618825667:web:5ddbb9aee28e4a58d70b76",
    databaseURL: "https://lottery-game-form-default-rtdb.firebaseio.com"
  };
initializeApp(firebaseConfig);

const auth = getAuth();

const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const formProps = new FormData(event.target);
    const formData = Object.fromEntries(formProps);
    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then(() => (location.href = "/admin/data.html"))
      .catch((err) => failMessage(err));
  });
}

const loginOutButton = document.getElementById("loginOutButton");
if (loginOutButton) {
  loginOutButton.addEventListener("click", () => signOut(auth));
}

onAuthStateChanged(auth, (user) => {
  const index = "/admin/index";
  const data = "/admin/data";
  const currentPage = location.pathname;

  if (user) {
    if (user.uid != "MdeVTeZxExXw2g5d9wUYvmjoHXJ3") signOut(auth);
    if (currentPage.startsWith(index)) {
      location.pathname = data + ".html";
    }
  } else {
    if (!currentPage.startsWith(index)) {
      location.pathname = index + ".html";
    }
  }
});

export function failMessage(err) {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: err || "Something went wrong!",
  }).then(() => location.reload());
}

export function successMessage(msg) {
  Swal.fire({
    icon: "success",
    title: "Submitted!",
    text: msg || "Thank you for reaching out to us!",
  }).then(() => location.reload());
}
