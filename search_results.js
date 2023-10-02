const apiUrl = "https://api.noroff.dev";
const postsUrl = "/api/v1/social/posts/";
const allPostsUrl = apiUrl + postsUrl;

const queryString = document.location.search;
const params = new URLSearchParams(queryString);

const search = params.get("search");

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

/**
 * This will run through the input text in
 * the search field and check if any of the
 * posts matches the input text
 * @param {string} posts
 * @param {string} searchText
 * @returns the results of the posts that
 * matches the input text
 */

function filterPosts(posts, searchText) {
  const results = posts.filter(function (post) {
    if (!post.body) post.body = "";
    if (!post.title) post.title = "";
    const postTitle = post.title.toLowerCase();
    const postBody = post.body.toLowerCase();
    const search = searchText.toLowerCase();
    const includes = postTitle.includes(search) || postBody.includes(search);
    return includes;
  });
  console.log(results);
  return results;
}

function showResults(results) {
  const searchResult = document.querySelector(".search_result");
  const card = document.querySelector(".posts");
  const noResult = results.length === 0;

  if (noResult) {
    searchResult.textContent = "No result";
  } else {
    for (let i = 0; i < results.length; i++) {
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
      postLink.href = titleUrl + `${results[i].id}`;

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

      postTitle.textContent = results[i].title;
      postText.textContent = results[i].body;

      if (results[i].media) {
        imageContainer.src = results[i].media;
      }

      if (results[i].tags) {
        tags.textContent = results[i].tags;
      }

      card.append(cardTextContent);
      cardTextContent.appendChild(imageContainer);
      cardTextContent.append(postTitle);
      cardTextContent.append(postText);
      cardTextContent.append(lowerCard);
      lowerCard.append(postLink);
    }
  }
}

async function allResults() {
  const searchedPosts = filterPosts(posts, search);
  showResults(searchedPosts);
}

allResults();
