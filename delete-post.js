const apiUrl = "https://api.noroff.dev";
const postsUrl = "/api/v1/social/posts/";
const allPostsUrl = apiUrl + postsUrl;

const deleteBtn = document.querySelector(".delete");
deleteBtn.addEventListener("click", onClick);

const queryString = document.location.search;
const params = new URLSearchParams(queryString);

const id = params.get("id");

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
  if (deletePost.statusCode === undefined) {
    location.href = "/feed";
  } else {
    const showError = document.querySelector("#showError");
    showError.classList.remove("invisible");
  }
}
