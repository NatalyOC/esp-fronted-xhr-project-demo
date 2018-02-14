const searchForm = document.getElementById('search-form');
const searchField = document.getElementById('search-keyword');
const responseContainer = document.getElementById('response-container');
let searchedForText;

// Llamamos al evento 
searchForm.addEventListener('submit',function(e) {
  e.preventDefault();
  responseContainer.innerHTML='';
  searchedForText = searchField.value;
  getNews();
});

// Función que crea peticiones
function getNews(){
    // Declaramos la constante que almacenará el objeto
    const articleRequest = new XMLHttpRequest();
    articleRequest.open('GET',`http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=21ad982552504a45a7350e340c238367`);
    articleRequest.onload=addNews;
    articleRequest.onerror=handleError;
    articleRequest.send();
}
function handleError(){
    console.log('Se ha presentado un error');
}
function addNews(){
    //Convirtiendo la data en json
    const data = JSON.parse(this.responseText);
    //console.log(data);
    const response=data.response;
    //console.log(response); 
    const docs=data.response.docs;
    //console.log(docs,docs.length);
    let li='';
    let article='';
    let title='';
    let snippet='';
    for( var i=0; i<docs.length;i++){
      article=data.response.docs[i];
      //console.log(article)
      let image='http://graphics8.nytimes.com/'+article.multimedia[0].url;
      //console.log(image);
      title=article.headline.main;
      //console.log(title);
      snippet = article.snippet;
      //console.log(snippet);
  
      li =document.createElement('li');
      li.className='articleClass';
      
      li.innerHTML=`<div class="card"><img src="${image}" class="card-img-top"><div class="card-body"><p class="card-text">${snippet}</p></div></div>`;
      
      responseContainer.appendChild(li);
    }
    

    
}