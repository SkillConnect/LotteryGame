import { successMessage, failMessage, app } from "./index.js";
import {
  getDatabase,
  set,
  ref,
  get,
  child,
  remove,
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

  email = email.toLowerCase();
  const emailValidity = await validateData("email", email);
  if (!emailValidity) {
    failMessage("Email already exists!");
    return;
  }

  try {
    await set(ref(db, `email/${uniqueCode}`), email);
  } catch (error) {
    console.log(error);
    failMessage();
    return;
  }

  const phoneValidity = await validateData("phone", phone);
  if (!phoneValidity) {
    await remove(ref(db, `email/${uniqueCode}`));
    failMessage("Phone already exists!");
    return;
  }

  try {
    await set(ref(db, `phone/${uniqueCode}`), phone);
  } catch (error) {
    failMessage();
    console.log(error);
  }

  if (!isCodeValid) {
    failMessage("Invalid Unique code!");
    return;
  } else {
    await set(ref(db, `UniqueCodes/${uniqueCode}`), true);
  }

  try {
    await set(ref(db, `formData/${uniqueCode}`), {
      email,
      phone,
      name,
      uniqueCode,
      createdAt: new Date().getTime(),
    });
    successMessage();
  } catch (error) {
    failMessage();
    return;
  }
}

async function validateData(path, value) {
  const pathData = await get(child(dbRef, path));
  if (pathData.exists()) {
    const data = pathData.val();
    for (let key in data) {
      if (data[key] === value) {
        return false;
      }
    }
  }
  return true;
}
