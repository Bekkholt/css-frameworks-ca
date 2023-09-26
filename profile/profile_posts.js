// import { displayPost } from "../feed/posts";

// const apiUrl = "https://api.noroff.dev";
// const profileUrl = "/api/v1/social/profiles";
// const allProfilesUrl = apiUrl + profileUrl;

// /**
//  * This will get all the profiles from the API
//  */

// async function fetchProfiles(url) {
//   try {
//     const token = localStorage.getItem("accessToken");
//     const getData = {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     };
//     const response = await fetch(url, getData);
//     console.log(response);
//     const json = await response.json();
//     return json;
//   } catch (error) {}
// }

// const profiles = await fetchProfiles(allProfilesUrl);
// console.log(profiles);

// /**
//  * This loops through and shows the 10 first posts
//  * from the profile in the API
//  * @param {string} posts
//  */
// function displayPosts(profiles) {
//   if (Authorization === `Bearer ${token}`) {
//     for (let i = 0; i < 20; i++) {
//       const post = profiles.posts[i];
//       displayPost(post);
//     }
//   }
// }
// displayPosts(posts);
