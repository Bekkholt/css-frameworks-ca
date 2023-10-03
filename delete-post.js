const apiUrl = "https://api.noroff.dev";
const postsUrl = "/api/v1/social/posts/";
const allPostsUrl = apiUrl + postsUrl;

const remove = document.querySelector(".delete");
remove.addEventListener("click", onClick);

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

await fetchSpecificPost(id);

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

async function onClick(event) {
  event.preventDefault();
  await deletePost(allPostsUrl + id);
}
