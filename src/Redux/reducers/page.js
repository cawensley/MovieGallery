export default function page(state = localStorage.getItem('Pageselected') || 1, action) {
  if (action.type === 'Page_Change') {
    return action.payload;
  }
  return state;
}
