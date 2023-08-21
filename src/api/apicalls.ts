const apikey: string = '0b83dec7f1a264bf9ecb823f8143b940';

export const baseImageUrl = (size: string, path: string) => {
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

export const nowPlayingMovies: string = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}`;
export const upComingMovies: string = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apikey}`;
export const popularMovies: string = `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}`;

export const searchMovies = (keyWord: string) => {
  return `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${keyWord}`;
};

export const movieDetails = (id: number) => {
  return `https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}`;
};

export const movieCastDetails = (id: number) => {
  return `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apikey}`;
};

export const getTestImageData = async () => {
  try {
    const response = await fetch('https://my-json-server.typicode.com/CarlosMS12/marg/db');
    const data = await response.json();
    return data.videos && data.videos.length > 0 ? data.videos[0] : null;
  } catch (error) {
    console.error('Error fetching test image data:', error);
    return null;
  }
};

// Nueva función para obtener la URL del video según el ID de la película
export const getVideoUrlForMovieId = async (movieId: number): Promise<string | null> => {
  try {
    const response = await fetch('https://raw.githubusercontent.com/CarlosMS12/hyperblog-1/master/h2.json');
    const data = await response.json();

    // Busca el video con el ID de la película
    const video = data.videos.find((v: any) => v.id === movieId);

    if (video) {
      return video['url-video'];
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching video data:', error);
    return null;
  }
};
