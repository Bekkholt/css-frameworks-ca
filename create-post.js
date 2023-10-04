const apiUrl = "https://api.noroff.dev";
const postsUrl = "/api/v1/social/posts";
const allPostsUrl = apiUrl + postsUrl;

const upload = document.querySelector(".upload");
upload.addEventListener("click", onClick);

const imageContainer = document.querySelector(".image");
const titleContainer = document.querySelector(".title");
const bodyContainer = document.querySelector(".body");

async function createPost(url, image, title, body) {
  try {
    const token = localStorage.getItem("accessToken");
    const getData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        media: image,
        title: title,
        body: body,
      }),
    };
    const response = await fetch(url, getData);
  } catch (error) {}
}

async function onClick(event) {
  event.preventDefault();
  const image = imageContainer.value;
  const title = titleContainer.value;
  const body = bodyContainer.value;
  await createPost(allPostsUrl, image, title, body);
  if (createPost.statusCode === undefined) {
    location.href = "/feed";
  } else {
    const showError = document.querySelector("#showError");
    showError.classList.remove("invisible");
  }
}
