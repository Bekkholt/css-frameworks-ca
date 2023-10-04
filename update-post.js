const apiUrl = "https://api.noroff.dev";
const postsUrl = "/api/v1/social/posts/";
const allPostsUrl = apiUrl + postsUrl;

const queryString = document.location.search;
const params = new URLSearchParams(queryString);

const id = params.get("id");

/**
 * This fetches the specific posts
 * from the API based on their IDs
 * @param {string} id
 * @returns the specific posts from ID
 */
async function fetchSpecificPost(id) {
  try {
    const token = localStorage.getItem("accessToken");
    const getData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(allPostsUrl + `${id}`, getData);
    const result = await response.json();

    return result;
  } catch (error) {}
}

const post = await fetchSpecificPost(id);

const update = document.querySelector(".update");
update.addEventListener("click", onClick);

const imageContainer = document.querySelector(".image");
const titleContainer = document.querySelector(".title");
const bodyContainer = document.querySelector(".body");

function postDetails(post) {
  imageContainer.value = post.media;
  titleContainer.value = post.title;
  bodyContainer.value = post.body;
}

postDetails(post);

async function editPost(url, image, title, body) {
  try {
    const token = localStorage.getItem("accessToken");
    const getData = {
      method: "PUT",
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
  await editPost(allPostsUrl + id, image, title, body);
  if (editPost.statusCode === undefined) {
    location.href = "/feed";
  } else {
    const showError = document.querySelector("#showError");
    showError.classList.remove("invisible");
  }
}
