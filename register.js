const apiUrl = "https://api.noroff.dev";
const userName = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#inputPassword");
const form = document.querySelector("#form");

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
  } catch (error) {}
}

async function submit() {
  const user = {
    name: userName.value,
    email: email.value,
    password: password.value,
  };
  await register(`${apiUrl}/api/v1/social/auth/register`, user);
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  await submit();
});
