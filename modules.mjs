const apiUrl = "https://api.noroff.dev";
const postsUrl = "/api/v1/social/posts/";
const allPostsUrl = apiUrl + postsUrl;

/**
 * This will get all the posts from the API
 * @returns all posts from API
 */

async function fetchPosts(url) {
  try {
    const token = localStorage.getItem("accessToken");
    const getData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, getData);
    const posts = await response.json();
    return posts;
  } catch (error) {}
}
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
    const response = await fetch(
      allPostsUrl + `${id}` + `?_author=true`,
      getData
    );
    const result = await response.json();

    return result;
  } catch (error) {}
}

/**
 * This will display the posts from the API in the feed
 * @param {string} posts The posts to display
 */

function displayPost(posts) {
  const card = document.querySelector(".posts");
  const cardTextContent = document.createElement("div");
  const imageContainer = document.createElement("img");
  const postTitle = document.createElement("h5");
  const postText = document.createElement("p");
  const lowerCard = document.createElement("div");
  const postLink = document.createElement("a");

  const tags = lowerCard.appendChild(document.createElement(`h6`));
  const button = postLink.appendChild(document.createElement(`button`));
  const btnText = button.appendChild(document.createElement(`h6`));
  const titleUrl = "../post_specific.html?id=";
  postLink.href = titleUrl + `${posts.id}`;

  card.classList.add("col-10", "m-3", "col-md-8", "col-lg-6");
  cardTextContent.classList.add("mb-4", "p-3", "bg-light");
  imageContainer.classList.add("card-img-top");
  postTitle.classList.add("card-title");
  postText.classList.add("card-text");
  postLink.classList.add("btn-outline-secondary", "col-lg-6");
  button.classList.add(
    "btn",
    "btn-dark",
    "btn-outline-secondary",
    "rounded-pill",
    "mt-4"
  );

  btnText.textContent = "Go to post";
  postTitle.textContent = posts.title;
  postText.textContent = posts.body;

  if (posts.media) {
    imageContainer.src = posts.media;
  }

  if (posts.tags) {
    tags.textContent = posts.tags;
  }

  card.append(cardTextContent);
  cardTextContent.appendChild(imageContainer);
  cardTextContent.append(postTitle);
  cardTextContent.append(postText);
  cardTextContent.append(lowerCard);
  lowerCard.append(postLink);
}

/**
 * This loops through and shows the 20 first posts from the API
 * @param {string} posts The posts that loops through
 */
function displayPosts(posts) {
  let postNumber = posts.length;
  if (postNumber > 20) {
    postNumber = 20;
  }
  for (let i = 0; i < postNumber; i++) {
    const post = posts[i];
    displayPost(post);
  }
}

export { fetchPosts };
export { fetchSpecificPost };
export { displayPost };
export { displayPosts };
