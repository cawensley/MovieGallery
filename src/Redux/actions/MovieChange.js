export default function MovieChange(movieID) {
  localStorage.setItem('Movieselected', movieID);
  return { type: 'Movie_Change', payload: movieID };
}
