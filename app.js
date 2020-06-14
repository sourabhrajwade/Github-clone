const searchBar = document.getElementById("search");
const results = document.getElementById("resultPub");
let searchRes;

const avatarImg = document.querySelector(".avatarImg");
const name = document.querySelector(".name");
const followers = document.querySelector(".follower");
const following = document.querySelector(".following");
const personalblog = document.querySelector(".personalblog");
const locationInfo = document.querySelector(".location");
const username = document.querySelector(".usern");
const repoCount = document.querySelector(".repoCount");
const gistCount = document.querySelector(".gistCount");
const cardBody = document.querySelector(".card-container");



const fetchUsers = async (user) => {
  const api_call = await fetch(
    `https://api.github.com/users/${user}?client_id=${client_ID}&client_secret=${clinet_secret}`
  );
  const data = await api_call.json();
  return data;
};
const fetchRepos = async (user) => {
  const repo_url = `https://api.github.com/users/${user}/repos`;
  const api_repos = await fetch(repo_url);
  const repoData = await api_repos.json();
  return [...repoData];
};

function getData() {
  searchRes = searchBar.value;
  fetchUsers(searchRes).then((res) => {
    avatarImg.src = res.avatar_url;
    //console.log(res);
    name.textContent = `${res.name}`;
    username.textContent = `${res.login}`;
    followers.textContent = `Followers: ${res.followers}`;
    following.textContent = `Following: ${res.following}`;
    res.blog
      ? (personalblog.textContent = res.blog)
      : (personalblog.textContent = res.html_url);
    locationInfo.textContent = `Location - ${res.location}`;
    repoCount.textContent = `Total Repos - ${res.public_repos}`;
    gistCount.textContent = `Total Gist - ${res.public_gists}`;
    // getRepositories();
  });
  fetchRepos(searchRes).then((res) => {
    //console.log(res);
    for (let i = 0; i < 5; i++) {
      const card = document.createElement("div");
      card.classList.add("card", "m-3");
      card.innerHTML = ` 
        
            <div class="card-body">
                <h5 class="card-title">${res[i].name}</h5>
                <p class="card-text">
                <p>Publised on ${res[i].created_at.slice(0, 10)}</p>
                <a href="${
                  res[i].clone_url
                }" class="btn btn-primary" target="_blank">Follow Repo</a>
            </div>
        
        `;
      cardBody.appendChild(card);
    }

    // res.forEach((ele) => {
    //   console.log(ele);
    //   cardBody.innerHTML = `
    //     <div class="card m-3 ">
    //         <div class="card-body">
    //             <h5 class="card-title">${ele.name}</h5>
    //             <p class="card-text">
    //               clone- ${ele.clone_url}
    //               content.
    //             </p>
    //             <p>Publised on ${ele.created_at.slice(10)}</p>
    //             <a href="${ele.clone_url}" class="btn btn-primary" target="_blank">Follow Repo</a>
    //         </div>
    //     </div>
    //     `;
    // });
  });
}
