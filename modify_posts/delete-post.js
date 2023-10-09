const apiUrl = "https://api.noroff.dev";
const postsUrl = "/api/v1/social/posts/";
const allPostsUrl = apiUrl + postsUrl;

const deleteBtn = document.querySelector(".delete");
deleteBtn.addEventListener("click", onClick);

const queryString = document.location.search;
const params = new URLSearchParams(queryString);

const id = params.get("id");

/**
 * This deletes the selected
 * post from the API
 * @param {string} url The post url
 */
async function deletePost(url) {
  try {
    const token = localStorage.getItem("accessToken");
    const getData = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, getData);
  } catch (error) {}
}

/**
 * This deletes the post from
 * the API when clicking "delete"
 * and returns the user to the
 * feed page if succeeded or
 * gives an error message if it fails
 * @param {event} event The event that hhappens on click
 */
async function onClick(event) {
  event.preventDefault();
  await deletePost(allPostsUrl + id);
  /* Statuscode is set to *undefined* as this is
  what is returned when it is successful
  and goes through to the API*/
  if (deletePost.statusCode === undefined) {
    location.href = "/profile";
  } else {
    const showError = document.querySelector("#showError");
    showError.classList.remove("invisible");
  }
}
