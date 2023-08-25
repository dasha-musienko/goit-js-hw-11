const axios = require('axios').default;


const links = {
  BASE_URL: "https://pixabay.com/api/",
  API_KEY: "14680728-3f8c28130e81fd897982d94fd",
  imageType: "photo",
  orientation: "horizontal",
  safesearch: true,
  perPage: 40,

}

export async function getImg(query, page) {

  const response = await axios.get(`${links.BASE_URL}?key=${links.API_KEY}&q=${query}&image_type=${links.imageType}&orientation=${links.orientation}&safesearch=${links.safesearch}&per_page=${links.perPage}&page=${page}`);
  
  return response.data
  // try {
  //   const response = await axios.get(`${links.BASE_URL}?key=${links.API_KEY}&q=${query}&image_type=${links.imageType}&orientation=${links.orientation}&safesearch=${links.safesearch}&per_page=${links.perPage}&page=${page}`);
  //   return response.data
    
  // } catch (error) {
  //   return error
  // }
}


