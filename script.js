// Fetches all characters from API
function fetchCharacters() {
    fetch('https://rickandmortyapi.com/api/character')
        .then((response) => response.json())
        .then((data) => console.log(data.results))
}

fetchCharacters();