const apiUrl = "https://api.noroff.dev";
const postsUrl = "/api/v1/social/posts";
const allPostsUrl = apiUrl + postsUrl;

const upload = document.querySelector(".upload");
upload.addEventListener("click", onClick);

const titleContainer = document.querySelector(".title");
const bodyContainer = document.querySelector(".body");

async function createPost(url, title, body) {
  try {
    const token = localStorage.getItem("accessToken");
    const getData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: title,
        body: body,
      }),
    };
    const response = await fetch(url, getData);
  } catch (error) {}
}

async function onClick(event) {
  event.preventDefault();
  const title = titleContainer.value;
  const body = bodyContainer.value;
  await createPost(allPostsUrl, title, body);
}
