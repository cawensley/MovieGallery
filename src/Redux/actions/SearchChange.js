export default function SearchChange(inputString) {
    localStorage.setItem("Searchstring",inputString);
    return {type: 'Search_Change',payload: inputString};
}