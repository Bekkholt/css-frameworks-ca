const apiUrl = "https://api.noroff.dev";
const postsUrl = "/api/v1/social/posts";
const allPostsUrl = apiUrl + postsUrl;

const queryString = document.location.search;
const params = new URLSearchParams(queryString);

const search = params.get("search");

import { fetchPosts } from "./feed/posts.js";

const posts = await fetchPosts(allPostsUrl);
console.log(posts);

/**
 * This will run through the input text in
 * the search field and check if any of the
 * posts matches the input text
 * @param {string} json
 * @param {string} searchText
 * @returns the results of the posts that
 * matches the input text
 */

function getPosts(json, searchText) {
  console.log(json, searchText);
  const results = json.filter(function (post) {
    const postTitle = post.title.rendered.toLowerCase();
    const postBody = post.body.rendered.toLowerCase();
    const search = searchText.toLowerCase();
    const includes = postTitle.includes(search) || postBody.includes(search);
    return includes;
  });
  return results;
}

function showResults(result) {
  const searchResult = document.querySelector(".search_result");
  const card = document.querySelector(".posts");
  const cardTextContent = document.createElement("div");
  const imageContainer = document.createElement("img");
  const postTitle = document.createElement("h5");
  const postText = document.createElement("p");
  const lowerCard = document.createElement("div");
  const noResult = result.length === 0;

  if (noResult) {
    searchResult.textContent = "No result";
  } else {
    for (let i = 0; i < result.length; i++) {
      card.classList.add("col-10", "m-3", "col-md-8", "col-lg-6");
      cardTextContent.classList.add("mb-4", "p-3", "bg-light");
      imageContainer.classList.add("card-img-top");
      postTitle.classList.add("card-title");
      postText.classList.add("card-text");
      lowerCard.classList.add("d-flex");

      document.title = "search_results.html?id=" + `${result[i]}.id`;

      const tags = lowerCard.appendChild(document.createElement(`h6`));

      postTitle.textContent = result[i].title;
      postText.textContent = result[i].body;

      if (result.media) {
        imageContainer.src = result[i].media;
      }

      if (result.tags) {
        tags.textContent = result[i].tags;
      }

      searchResult.append(card);
      card.append(cardTextContent);
      cardTextContent.appendChild(imageContainer);
      cardTextContent.append(postTitle);
      cardTextContent.append(postText);
      cardTextContent.append(lowerCard);
    }
  }
}

async function allResults() {
  const searchedPosts = getPosts(search);
  showResults(searchedPosts);
}

allResults();
