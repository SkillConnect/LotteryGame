import { successMessage, failMessage, app } from "./index.js";
import {
  getDatabase,
  set,
  ref,
  get,
  child,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";

const db = getDatabase(app);
const dbRef = ref(getDatabase());

const contactForm = document.getElementById("contact-form");
contactForm.addEventListener("submit", async function (event) {
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
  } else {
    try {
      await submitForm(name, email, phone, uniqueCode);
    } catch (error) {
      failMessage(error);
    }
  }
});

async function submitForm(name, email, phone, uniqueCode) {
  const id = new Date().getTime();
  let isCodeValid = false;

  const uniqueCodes = await get(child(dbRef, "UniqueCodes"));

  if (uniqueCodes.exists()) {
    const data = uniqueCodes.val();
    for (let key in data) {
      if (uniqueCode === key && data[key] === false) {
        isCodeValid = true;
        break;
      }
    }
  } else {
    failMessage();
  }

  if (!isCodeValid) {
    failMessage("Invalid Unique code!");
    return;
  } else {
    await set(ref(db, `UniqueCodes/${uniqueCode}`), true);
  }

  await set(ref(db, `email/${id}`), `${email}`);

  await set(ref(db, `phone/${id}`), `${phone}`);

  await set(ref(db, `formData/${id}`), {
    email,
    phone,
    name,
    uniqueCode,
    createdAt: new Date().toISOString(),
  });
  successMessage();
}
