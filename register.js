import { apiUrl } from "../modules.mjs";

const userName = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#inputPassword");
const form = document.querySelector("#form");

/**
 * This will get the url and data from the API
 * @param {string} url The API url
 * @param {string} user The user data
 * @returns the json data
 */

async function register(url, user) {
  try {
    const data = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    };
    const response = await fetch(url, data);
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
}

/**
 * This will submit the data inserted in
 * the form and check if the registration
 * is successful or if it has errors
 */

async function submit() {
  const user = {
    name: userName.value,
    email: email.value,
    password: password.value,
  };
  const json = await register(`${apiUrl}/api/v1/social/auth/register`, user);

  if (json.statusCode === undefined) {
    const showSuccess = document.querySelector("#showSuccess");
    showSuccess.classList.remove("invisible");
  } else if (json.statusCode === 400) {
    const showError = document.querySelector("#showError");
    showError.classList.remove("invisible");
    const errorMessage = document.querySelector("#errorMessage");
    const errors = json.errors;
    let errorText = "";
    for (let i = 0; i < errors.length; i++) {
      if (i !== 0) errorText += ", ";
      const error = errors[i];
      errorText += error.message;
    }
    errorMessage.textContent = errorText;
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  await submit();
});
