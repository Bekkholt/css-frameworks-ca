import { fetchPosts } from "./modules.mjs";
import { apiUrl } from "../modules.mjs";

const postsUrl = "/api/v1/social/posts/";
const allPostsUrl = apiUrl + postsUrl;

const posts = await fetchPosts(allPostsUrl);

/**
 * This will filter through the posts
 * in the API and find the ones with an image
 * @param {string} post The post that gets filtered
 * @returns The posts with an image
 */
function filterPosts(post) {
  const results = post.filter((posts) => {
    if (posts.media) return posts;
  });
  return results;
}

/**
 * This will make the HTML
 * for the posts that is returned
 * with an image from filterposts
 * @param {string} posts The posts that has an image
 */
function showPosts(posts) {
  const card = document.querySelector(".posts");

  for (let i = 0; i < posts.length; i++) {
    const cardTextContent = document.createElement("div");
    const imageContainer = document.createElement("img");
    const postTitle = document.createElement("h5");
    const postText = document.createElement("p");
    const lowerCard = document.createElement("div");
    const postLink = document.createElement("a");

    const tags = lowerCard.appendChild(document.createElement(`h6`));
    const button = postLink.appendChild(document.createElement(`button`));
    const btnText = button.appendChild(document.createElement(`h6`));
    const titleUrl = "/post_specific.html?id=";
    postLink.href = titleUrl + `${posts[i].id}`;

    card.classList.add("col-10", "m-3", "col-md-8", "col-lg-6");
    cardTextContent.classList.add("mb-4", "p-3", "bg-light");
    imageContainer.classList.add("card-img-top");
    postTitle.classList.add("card-title");
    postText.classList.add("card-text");
    lowerCard.classList.add("d-flex");
    postLink.classList.add("btn-outline-secondary", "col-lg-6");
    button.classList.add(
      "btn",
      "btn-dark",
      "btn-outline-secondary",
      "rounded-pill",
      "mt-4"
    );

    postTitle.textContent = posts[i].title;
    postText.textContent = posts[i].body;
    imageContainer.src = posts[i].media;
    btnText.textContent = "Go to post";

    if (posts[i].tags) {
      tags.textContent = posts[i].tags;
    }

    card.append(cardTextContent);
    cardTextContent.appendChild(imageContainer);
    cardTextContent.append(postTitle);
    cardTextContent.append(postText);
    cardTextContent.append(lowerCard);
    lowerCard.append(postLink);
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
