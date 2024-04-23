// api url

const ApiKey = "d6ab1233519145508b57275aa78bac4f";


const Url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load",() => fetchNews("India"));

// navbar events

let navLogo = document.getElementById("nav-logo");
navLogo.addEventListener("click", () => fetchNews("World"));



async function fetchNews(query) {
  const res = await fetch(`${Url}${query}&apiKey=${ApiKey}`);
  const data = await res.json();
  // console.log(data.articles[0]);
  bindData(data.articles);
}


function bindData(articles) {

  let cardContainer = document.querySelector(".card-container");

  cardContainer.innerHTML="";

  let innerCard = "";
  
  articles.forEach(article => {
   if(!article.urlToImage) {
    return;
   }

   let publishDate = new Date(article.publishedAt).toLocaleString();

    innerCard += `
    <div class="card">
    <img src="${article.urlToImage}" class="card-img-top" alt="">
    <div class="card-body">
      <h5 class="card-title">${article.title}</h5>
      <p class="publish-date">${publishDate}</p>
      <p class="card-description">${article.description}</p>
      <a href="${article.url}" class="news-detail">Read More > </a>
    </div>
  </div>
    `;

    cardContainer.innerHTML = innerCard;

  });

}

// events on different field news 

let currentSelectNav = null;

let Science = document.getElementById("Science");
Science.addEventListener("click", () => onNavItemClick('Science'));

let Finance = document.getElementById("Finance");
Finance.addEventListener("click", () => onNavItemClick('Finance'));

let Cricket = document.getElementById("Cricket");
Cricket.addEventListener("click", () => onNavItemClick('Cricket'));

function onNavItemClick(id) {
  fetchNews(id);
  let currentNav = document.getElementById(id);
  if(currentSelectNav) {
    currentSelectNav.classList.remove("active");
  currentSelectNav.style.color="white";

  }
  currentSelectNav = currentNav;
  currentSelectNav.classList.add("active");
  currentSelectNav.style.color="yellowgreen";

  
  // console.log(id)
}

// search section 


let searchBtn =document.getElementById("search-btn");
let searchInput =document.getElementById("search-input");

searchBtn.addEventListener("click" , () => {
  let query =searchInput.value;
  if(!query) {
    return;
  }
  // console.log(query);
  fetchNews(query);

  if(currentSelectNav) {
    currentSelectNav.classList.remove("active");
  }
  currentSelectNav = null ;
  
});

