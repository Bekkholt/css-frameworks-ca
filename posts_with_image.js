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

const posts = await fetchPosts(allPostsUrl);

console.log(posts);

/**
 * This will filter through the posts
 * in the API and find the ones with an image
 * @param {string} post
 * @returns The posts with an image
 */
function filterPosts(post) {
  const results = post.filter(function (posts) {
    if (posts.media) return posts;
  });
  return results;
}

/**
 * This will make the HTML
 * for the posts that is returned
 * with an image from filterposts
 * @param {string} posts
 */
function showPosts(posts) {
  const card = document.querySelector(".posts");

  for (let i = 0; i < posts.length; i++) {
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

    postTitle.textContent = posts[i].title;
    postText.textContent = posts[i].body;
    imageContainer.src = posts[i].media;

    if (posts[i].tags) {
      tags.textContent = posts[i].tags;
    }

    card.append(cardTextContent);
    cardTextContent.appendChild(imageContainer);
    cardTextContent.append(postTitle);
    cardTextContent.append(postText);
    cardTextContent.append(lowerCard);
  }
}

/**
 * This will display all the results
 * with the data from the API, filtered
 * with images and into HTML
 */

async function allResults() {
  const withImage = filterPosts(posts);
  showPosts(withImage);
}

allResults();