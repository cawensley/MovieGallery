export default function ResultsChange(Results) {
    localStorage.setItem("Resultsselected",Results);
    return {type: 'Results_Change',payload: Results};
}