export const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const apiKey = "2f7f39f929e3844ba712ef9350c2fe50";

const tmbdEndpoint = "https://api.themoviedb.org/3/movie";
const tmbdEndpointSearch = "https://api.themoviedb.org/3/search/movie";
export const tmdbAPI = {
  getMovieList: (type, page = 1) => `${tmbdEndpoint}/${type}?api_key=${apiKey}&page=${page}`,
  getMovieDetails: (movieId) => ` ${tmbdEndpoint}/${movieId}?api_key=${apiKey}`,
  getMovieMeta: (movieId, type) => `${tmbdEndpoint}/${movieId}/${type}?api_key=${apiKey}`,
  imageOriginal: (url) => `https://image.tmdb.org/t/p/original/${url}`,
  image500: (url) => `https://image.tmdb.org/t/p/w500/${url}`,
  getMovieSearch: (query, page) =>
    `${tmbdEndpointSearch}?api_key=${apiKey}&query=${query}&page=${page}`,
};
