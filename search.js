const searchBar = document.getElementById("searchbar");

searchBar.addEventListener("keydown", handleKeyDown);

/**
 * This will make the searchbar react to the event
 * and give out the results from the input value
 * @param {string} event
 */
function handleKeyDown(event) {
  if (event.key === `Enter`) {
    event.preventDefault();
    const URL = "/search_results.html?search=";
    window.location.href = URL + searchBar.value;
  }
}
