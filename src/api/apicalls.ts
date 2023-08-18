const apikey: string = '0b83dec7f1a264bf9ecb823f8143b940';

export const baseImageUrl = (size:string, path:string) => {
    return `https://image.tmdb.org/t/p/${size}${path}`
}
export const nowPlayingMovies:string = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}`;
export const upComingMovies: string = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apikey}`;
export const popularMovies: string = `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}`;
export const searchMovies = (keyWord:string) => {
    return `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${keyWord}`
};
export const movieDetails = (id: number) => {
    return `https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}`
}
export const movieCastDetails = (id: number) => {
    return `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apikey}`
}