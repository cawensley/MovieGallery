export default function results (state=localStorage.getItem("Resultsselected") || 10,action) {
    if(action.type === 'Results_Change') {
        return action.payload;
    } else {
        return state;
    }
}