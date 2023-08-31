import {getImg} from "./js/axiosService"
import { createsMarkup } from "./js/rendersMarkup"
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

export const refs = {
  searchBtn: document.querySelector(".search-btn"),
  searchInput: document.querySelector(".search-input"),
  searchSection: document.querySelector(".search-section"),
  gallery: document.querySelector(".images-container"),
  guard: document.querySelector(".js-guard")
}

const tempValues = {
  query: "",
  page: 1,
}

let lightbox = "";





refs.searchBtn.addEventListener("click", searchBtnHandler)

async function searchBtnHandler (e) {
  e.preventDefault()
  // resetsQuery()
  resetsPage ()
  resetsMarkup ()

  
  if (refs.searchInput.value.trim().length === 0 ) {
    Notiflix.Notify.failure(`The input is empty. Enter minimum 1 symbol`);
  } else {
    const res = await getImg(tempValues.query, tempValues.page)
    

    if(res.total === 0) {
      console.log("message")
      Notiflix.Notify.failure(`Sorry, there are no images matching your search query. Please try again.`)

    } else {
      if (tempValues.page === 1) {
        Notiflix.Notify.success(`Hooray! We found ${res.totalHits} images.`)
      }
      await createsMarkup (res.hits)
      pinsSearchSection()
      incrementsPage()
      smoothScroll ()
      addsLightbox ()
      
      
    }
   
    
  }


}

refs.searchInput.addEventListener("input", searchInputHandler)




// ------------
function pinsSearchSection () {
  refs.searchSection.classList.add("fixed");
}

function searchInputHandler (e) {
  tempValues.query = e.target.value
}

function resetsQuery () {
  tempValues.query = "";
  refs.searchInput.value = "";
}

function resetsMarkup () {
  refs.gallery.innerHTML = "";
}

function incrementsPage () {
  tempValues.page += 1;
}

function resetsPage () {
  tempValues.page = 1;
}


function smoothScroll () {
  const { height } = refs.gallery
  .firstElementChild.getBoundingClientRect();

  window.scrollBy({
  top: height * 2,
  behavior: "smooth",
});
}





const options = {
  rootMargin: "1200px"
}
const observer = new IntersectionObserver(infiniteScrollHandler, options)



 function infiniteScrollHandler (entries) {
   entries.forEach(async (entry) => {
    if (entry.isIntersecting) {
      const res = await getImg(tempValues.query, tempValues.page); 
      if (res.total === 0) {
        observer.unobserve(refs.guard)
      } else {
        await createsMarkup (res.hits)
        addsLightbox ();


        if ((tempValues.page-1)*40 >= res.totalHits) {
          Notiflix.Notify.success(`You are at the end of the collection`)
        }
      }  

      incrementsPage ();
    }
  })
}


window.addEventListener('scroll', scrollHandler)
function scrollHandler () {
  observer.observe(refs.guard)
}




function addsLightbox () {
   lightbox = new SimpleLightbox('.gallery a', {
    captionsData: "alt",
    captionDelay: 250,
  });
}