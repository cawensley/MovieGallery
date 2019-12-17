export default function favorites (state=JSON.parse(localStorage.getItem("FavoriteArray")) || [],action) {
    if(action.type === 'Favorites_Change') {
        return action.payload;
    } else {
        return state;
    }
}