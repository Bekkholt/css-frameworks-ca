const apiUrl = "https://api.noroff.dev";
const postsUrl = "/api/v1/social/posts/";
const allPostsUrl = apiUrl + postsUrl;

const queryString = document.location.search;
const params = new URLSearchParams(queryString);

const id = params.get("id");

/**
 * This fetches the specific posts
 * from the API based on their IDs
 * @param {string} id The post ID
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

/**
 * This inserts the new input content
 * in the form so it can be
 * updated in the post
 * @param {string} post The specific post
 */
function postDetails(post) {
  imageContainer.value = post.media;
  titleContainer.value = post.title;
  bodyContainer.value = post.body;
}

postDetails(post);

/**
 * This makes the edit of the post
 * in the API
 * @param {string} url The post url
 * @param {string} image The post image
 * @param {string} title The post title
 * @param {string} body The post body
 */
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

/**
 * This makes the updated content go
 * through to the API when clicking "update"
 * and returns the user to the feed page
 * if succeeded or gives an
 * error message if it fails
 * @param {event} event The event that happens on click
 */
async function onClick(event) {
  event.preventDefault();
  const image = imageContainer.value;
  const title = titleContainer.value;
  const body = bodyContainer.value;
  await editPost(allPostsUrl + id, image, title, body);
  /* Statuscode is set to *undefined* as this is
  what is returned when it is successful
  and goes through to the API*/
  if (editPost.statusCode === undefined) {
    location.href = "/feed";
  } else {
    const showError = document.querySelector("#showError");
    showError.classList.remove("invisible");
  }
}
