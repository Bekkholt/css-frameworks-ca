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
  await userLogin(`${apiUrl}/api/v1/social/auth/login`, login);
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
        Authrorization: `Bearer ${token}`,
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
