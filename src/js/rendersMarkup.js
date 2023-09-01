import {refs} from "../index"

export async function createsMarkup (result) {
  
  const res = await result;
  [...res].map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
    refs.gallery.insertAdjacentHTML("beforeend", 
    `
    <li class="image" min-height="200px">
      <a href="${largeImageURL}">
      <img src=${webformatURL} alt="${tags}" lazyload>
      <ul class="image-stats">
      <li class="stat">
        <p class='stat-text'>Likes</p>
        <p class='stat-text'>${likes}</p>
      </li>
      <li class="stat">
        <p class='stat-text'>Views</p>
        <p class='stat-text'>${views}</p>
      </li>
      <li class="stat">
        <p class='stat-text'>Comments</p>
        <p class='stat-text'>${comments}</p>
      </li>
      <li class="stat">
        <p class='stat-text'>Downloads</p>
        <p class='stat-text'>${downloads}</p>
      </li>
    </ul>
    </a>
    
  </li>
    
    `)


    


  })

 
  
  
  
  
  



  /*

webformatURL - посилання на маленьке зображення для списку карток.
largeImageURL - посилання на велике зображення.
tags - рядок з описом зображення. Підійде для атрибуту alt.
likes - кількість лайків.
views - кількість переглядів.
comments - кількість коментарів.
downloads - кількість завантажень.
Якщо бекенд повертає порожній масив, значить нічого підходящого не було знайдено. У такому разі показуй повідомлення з текстом "Sorry, there are no images matching your search query. Please try again.". Для повідомлень використовуй бібліотеку notiflix.


*/
}