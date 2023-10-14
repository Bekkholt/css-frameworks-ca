import { fetchPosts } from "../modules.mjs";
import { displayPosts } from "../modules.mjs";
import { apiUrl } from "../modules.mjs";

const postsUrl = "/api/v1/social/posts";
const allPostsUrl = apiUrl + postsUrl;

const posts = await fetchPosts(allPostsUrl);

displayPosts(posts);
