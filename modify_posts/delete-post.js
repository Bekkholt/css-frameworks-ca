import { apiUrl } from "../modules.mjs";

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
    return response;
  } catch (error) {
    return error;
  }
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
  const response = await deletePost(allPostsUrl + id);
  if (response.ok) {
    location.href = "/profile";
  } else {
    const showError = document.querySelector("#showError");
    showError.classList.remove("invisible");
  }
}
