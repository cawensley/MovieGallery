export default function movie(state = localStorage.getItem('Movieselected') || null, action) {
  if (action.type === 'Movie_Change') {
    return action.payload;
  }
  return state;
}
