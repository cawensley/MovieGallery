export default function FavoritesChange(movieArray) {
    localStorage.setItem("FavoriteArray",JSON.stringify(movieArray));
    return {type: 'Favorites_Change',payload: movieArray};
}