const apiUrl = "https://api.noroff.dev";
const postsUrl = "/api/v1/social/posts/";
const allPostsUrl = apiUrl + postsUrl;

const queryString = document.location.search;
const params = new URLSearchParams(queryString);

const id = params.get("id");

/**
 * This fetches the specific posts
 * from the API based on their IDs
 * @param {string} id
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
    const response = await fetch(allPostsUrl + `${id}`, getData);
    const result = await response.json();

    return result;
  } catch (error) {}
}

/**
 * This will create the HTML with
 * the contents from the specific post
 * @param {string} specificPost
 */
function createPostHTML(specificPost) {
  document.title = "SOME app" + " | " + specificPost.title;
  const card = document.querySelector(".posts");
  const cardTextContent = document.createElement("div");
  const imageContainer = document.createElement("img");
  const postTitle = document.createElement("h1");
  const postText = document.createElement("p");
  const lowerCard = document.createElement("div");
  const postLink = document.createElement("a");
  const updateLink = document.createElement("a");

  const tags = lowerCard.appendChild(document.createElement(`h6`));
  const button = postLink.appendChild(document.createElement(`button`));
  const btnText = button.appendChild(document.createElement(`h6`));
  const lowerEnd = lowerCard.appendChild(document.createElement(`div`));
  const lastUpdated = lowerEnd.appendChild(document.createElement(`h6`));
  const created = lowerEnd.appendChild(document.createElement(`h6`));
  const updateButton = updateLink.appendChild(document.createElement(`button`));
  const updateBtnText = updateButton.appendChild(document.createElement(`h6`));
  const titleUrl = "/post_specific.html?id=";
  const editURL = "/modify_posts/update-post.html?id=";
  postLink.href = titleUrl + `${specificPost.id}`;
  updateLink.href = editURL + `${specificPost.id}`;

  card.classList.add("col-10", "m-3", "col-md-8", "col-lg-6");
  cardTextContent.classList.add("mb-4", "p-3", "bg-light");
  imageContainer.classList.add("card-img-top");
  postTitle.classList.add("card-title", "d-flex", "justify-content-center");
  postText.classList.add("card-text", "d-flex", "justify-content-center");
  postLink.classList.add("btn-outline-secondary", "col-lg-6", "m-4");
  lowerEnd.classList.add("d-flex", "flex-column", "pt-5");
  updateButton.classList.add(
    "btn",
    "btn-dark",
    "btn-outline-secondary",
    "rounded-pill",
    "col-3"
  );

  btnText.textContent = "Go to post";
  postTitle.textContent = specificPost.title;
  postText.textContent = specificPost.body;
  lastUpdated.textContent = "Last updated:" + " " + specificPost.updated;
  created.textContent = "Created:" + " " + specificPost.created;
  updateBtnText.textContent = "Edit post";

  if (specificPost.media) {
    imageContainer.src = specificPost.media;
  }

  if (specificPost.tags) {
    tags.textContent = specificPost.tags;
  }

  card.append(cardTextContent);
  cardTextContent.appendChild(imageContainer);
  cardTextContent.append(postTitle);
  cardTextContent.append(postText);
  cardTextContent.append(lowerCard);
  lowerCard.append(updateLink);
}

const specificPost = await fetchSpecificPost(id);
createPostHTML(specificPost);
