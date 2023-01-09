// Fetches all characters from API
const allRicksEl = document.getElementById("all-ricks");

function fetchRicks() {
  fetch("https://rickandmortyapi.com/api/character/?name=rick")
    .then((response) => response.json())
    .then((data) => renderRicks(data.results));
}

function renderRicks(rickArray) {
  allRicksEl.innerHTML = rickArray
    .map(
      (rick) =>
        `
            <section class="rick">
                <h2 class="rick-name">${rick.name}</h2>
                <img class="rick-img" src="${rick.image}"/>
                <div class="rick-status">${rick.status}</div>
                <div class="rick-location">${rick.location.name}</div>
                <div class="rick-description">${rick.name} is one of our star employees!</div>
            </section>
        `
    )
    .join("");
}

fetchRicks();
