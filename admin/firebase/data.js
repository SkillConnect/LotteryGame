import {} from "./index.js";
import {
  getDatabase,
  child,
  get,
  ref,
} from "https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js";

const dbRef = ref(getDatabase());
const dataTable = document.getElementById("data-table");

get(child(dbRef, `formData`))
  .then((snapshot) => {
    if (snapshot.exists()) {
      displayData(snapshot.val());
    } else {
      displayMessage("No data available");
    }
  })
  .catch((error) => {
    displayMessage(error);
  });

function displayData(data) {
  let tableValues = "";
  const ids = Object.keys(data);
  ids.forEach((id, ctr) => {
    const row = data[id];
    tableValues += `
      <tr class="text-center">
        <td> ${ctr + 1} </td>
        <td> ${row.name} </td>
        <td> ${row.email} </td>
        <td> ${row.phone} </td>
        <td> ${row.uniqueCode} </td>
        <td> ${new Date(row.createdAt).toDateString()} </td>
      </tr>`;
  });

  dataTable.innerHTML = tableValues;
}

function displayMessage(msg) {
  dataTable.innerHTML = `
    <tr>
      <td colspan="5" class="text-center">
        ${msg}
      </td>
    </tr>`;
}
