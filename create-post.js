const apiUrl = "https://api.noroff.dev";
const postsUrl = "/api/v1/social/posts";
const allPostsUrl = apiUrl + postsUrl;

const upload = document.querySelector(".upload");
upload.addEventListener("click", onClick);

const imageContainer = document.querySelector(".image");
const titleContainer = document.querySelector(".title");
const bodyContainer = document.querySelector(".body");

/**
 * This will create a new post
 * in the form with image, title
 * and body inputs that will
 * be posted to the API
 * @param {string} url
 * @param {string} image
 * @param {string} title
 * @param {string} body
 */
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

/**
 * This makes the content go through
 * to the API when clicking "upload to feed"
 * and returns the user to the
 * feed page if succeeded or gives
 * an error message if it fails
 * @param {string} event
 */
async function onClick(event) {
  event.preventDefault();
  const image = imageContainer.value;
  const title = titleContainer.value;
  const body = bodyContainer.value;
  await createPost(allPostsUrl, image, title, body);
  /* Statuscode is set to *undefined* as this is
  what is returned when it is successful
  and goes through to the API*/
  if (createPost.statusCode === undefined) {
    location.href = "/feed";
  } else {
    const showError = document.querySelector("#showError");
    showError.classList.remove("invisible");
  }
}
