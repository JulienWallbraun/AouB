const PIXABAY_KEY = "18957740-cc52fa8c7975fbd4a749df833";

export function getPictures (type, indexLimit) {
    const url = "https://pixabay.com/api/?key="+PIXABAY_KEY+"&q="+type.replace(" ","+")+"&image_type=photo&per_page="+indexLimit
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.error(error))
  }