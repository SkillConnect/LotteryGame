import { successMessage, failMessage, app } from "./index.js";
import {
  getDatabase,
  set,
  ref,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";

const db = getDatabase(app);

const contactForm = document.getElementById("contact-form");
contactForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const formProps = new FormData(event.target);
  const formData = Object.fromEntries(formProps);

  const { name, email, phone, uniqueCode } = formData;

  if (
    !name?.trim() ||
    !email?.trim() ||
    !phone?.trim() ||
    !uniqueCode?.trim()
  ) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please fill all the details correctly.",
    });
  }
});
