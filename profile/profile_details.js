import { fetchPosts } from "../modules.mjs";
import { displayPosts } from "../modules.mjs";

const username = localStorage.getItem("name");
const profileURL =
  "https://api.noroff.dev/api/v1/social/profiles/" + username + "/posts";

/**
 * This will show the username and
 * avatar for the profile logged in
 */
function displayUsername() {
  const usernameText = document.querySelector(".username");

  usernameText.textContent = username;
}

displayUsername();

const posts = await fetchPosts(profileURL);

displayPosts(posts);
