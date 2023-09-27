const apiUrl = "https://api.noroff.dev";
const postsUrl = "/api/v1/social/posts";
const allPostsUrl = apiUrl + postsUrl;

/**
 * This will get all the posts from the API
 * @returns all posts from API
 */

export async function fetchPosts(url) {
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

const posts = await fetchPosts(allPostsUrl);

/**
 * This will display the posts from the API in the feed
 * @param {string} posts
 */

export function displayPost(posts) {
  const card = document.querySelector(".posts");
  const cardTextContent = document.createElement("div");
  const imageContainer = document.createElement("img");
  const postTitle = document.createElement("h5");
  const postText = document.createElement("p");
  const lowerCard = document.createElement("div");

  card.classList.add("col-10", "m-3", "col-md-8", "col-lg-6");
  cardTextContent.classList.add("mb-4", "p-3", "bg-light");
  imageContainer.classList.add("card-img-top");
  postTitle.classList.add("card-title");
  postText.classList.add("card-text");
  lowerCard.classList.add("d-flex");

  const tags = lowerCard.appendChild(document.createElement(`h6`));

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
}

/* <div class="card col-10 m-3 col-md-8 col-lg-6">
<img
  src="../images/pawel-czerwinski-ruJm3dBXCqw-unsplash.jpg"
  class="card-img-top"
  alt="Abstract blue and pink art"
/>
<div class="card-body bg-light">
  <h5 class="card-title">Post title</h5>
  <p class="card-text">
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque,
    vitae debitis dicta expedita facere voluptatem?
  </p>
  <div class="d-flex justify-content-between">
    <button
      href="#"
      class="btn btn-dark btn-outline-secondary rounded-pill col-lg-6"
    >
      Go to post
    </button>
    <img
      src="../images/sobhan-joodi-Wl_N-A_Wp5U-unsplash.jpg"
      class="img-thumbnail col-2 rounded-circle bg-secondary border border-0"
      alt="Woman with black hair and dark sunglasses standing outside"
    />
  </div>
</div>
</div> */

/**
 * This loops through and shows the 20 first posts from the API
 * @param {string} posts
 */
function displayPosts(posts) {
  for (let i = 0; i < 20; i++) {
    const post = posts[i];
    displayPost(post);
  }
}

displayPosts(posts);
