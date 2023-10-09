import { fetchPosts } from "../modules.mjs";
import { displayPosts } from "../modules.mjs";

const apiUrl = "https://api.noroff.dev";
const postsUrl = "/api/v1/social/posts";
const allPostsUrl = apiUrl + postsUrl;

const posts = await fetchPosts(allPostsUrl);

displayPosts(posts);
