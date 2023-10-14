import { apiUrl } from "./modules.mjs";

const form = document.querySelector("#form");
const email = document.querySelector("#email");
const password = document.querySelector("#inputPassword");

/**
 * This will get the login data from the API and
 * send the access token to local storage and
 * the API
 * @param {string} url The API url
 * @param {string} login The login data
 * @returns the json data
 */

async function userLogin(url, login) {
  try {
    const data = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(login),
    };
    const response = await fetch(url, data);
    const json = await response.json();
    const accessToken = json.accessToken;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("name", json.name);
    localStorage.setItem("avatar", json.avatar);
    return json;
  } catch (error) {
    return error;
  }
}

/**
 * This will check the data inserted when
 * submitted to see if the login is
 * successful or if it has errors
 */

async function submit() {
  const login = {
    email: email.value,
    password: password.value,
  };
  const json = await userLogin(`${apiUrl}/api/v1/social/auth/login`, login);

  if (json.statusCode === undefined) {
    location.href = "/profile";
  } else {
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
