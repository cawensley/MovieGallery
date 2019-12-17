export default function search (state=localStorage.getItem("Searchstring") || "",action) {
    if(action.type === 'Search_Change') {
        return action.payload;
    } else {
        return state;
    }
}