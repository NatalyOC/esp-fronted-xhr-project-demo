const searchForm = document.getElementById('search-form');
const searchField = document.getElementById('search-keyword');
const responseContainer = document.getElementById('response-container');
let searchedForText;

// Llamamos al evento 
searchForm.addEventListener('submit', function(e) {
  e.preventDefault();
  responseContainer.innerHTML = '';
  searchedForText = searchField.value;
  getNews();
});

// Función que crea peticiones
function getNews() {
  // Declaramos la constante que almacenará el objeto
  const articleRequest = new XMLHttpRequest();
  articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=21ad982552504a45a7350e340c238367`);
  articleRequest.onload = addNews;
  articleRequest.onerror = handleError;
  articleRequest.send();
}
function handleError() {
  console.log('Se ha presentado un error');
}
function addNews() {
  // Convirtiendo la data en json
  const data = JSON.parse(this.responseText);
  // console.log(data);
  const response = data.response;
  console.log(response); 
  const docs = data.response.docs;
  // console.log(docs,docs.length);
  docs.forEach(function(element) {
    let article = element;
    // console.log(article)
    let image = 'http://graphics8.nytimes.com/' + article.multimedia[0].url;
    // console.log(image);
    let title = article.headline.main;
    // console.log(title);
    let snippet = article.snippet;
    // console.log(snippet);
    let url = article.web_url;
    let li = document.createElement('li');
    li.innerHTML = `<div class="card"><img src="${image}" class="card-img-top"><div class="card-body"><p class="card-text">${snippet}</p><a href="${url}" class="card-link">Leer más</a></div></div>`;
    responseContainer.appendChild(li);
  });
}