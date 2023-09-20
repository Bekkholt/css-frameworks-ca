const apiUrl = "https://api.noroff.dev";
const form = document.querySelector("#form");
const email = document.querySelector("#email");
const password = document.querySelector("#inputPassword");

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
    console.log(response);
    const json = await response.json();
    const accessToken = json.accessToken;
    localStorage.setItem("accessToken", accessToken);
    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
  }
}

async function submit() {
  const login = {
    email: email.value,
    password: password.value,
  };
  const json = await userLogin(`${apiUrl}/api/v1/social/auth/login`, login);
  console.log(json);

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
// tina
// tina.testuser@noroff.no
// password1234

async function fetchToken(url) {
  try {
    const token = localStorage.getItem("accessToken");
    const getData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, getData);
    console.log(response);
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.log(error);
  }
}

fetchToken(apiUrl + "/api/v1/social/posts");

// if (json.statusCode === 200) {
//   location.href = "/profile";
// } else {
//   const showError = document.querySelector("#showError");
//   showError.classList.remove("invisible");
//   const errorMessage = document.querySelector("#errorMessage");
//   const errors = json.errors;
//   let errorText = "";
//   for (let i = 0; i < errors.length; i++) {
//     if (i !== 0) errorText += ", ";
//     const error = errors[i];
//     errorText += error.message;
//   }
//   errorMessage.textContent = errorText;
// }
