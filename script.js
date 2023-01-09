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
                <img class="rick-img" src="${rick.image}"/>
                <div class="rick-headers">
                    <h3 class="rick-name">${rick.name}</h3>
                    <div class="rick-status bold">Status: ${rick.status}</div>
                    <div class="rick-location bold">Location: ${rick.location.name}</div>
                </div>
                <div class="rick-description">${rick.name} is one of our star employees!</div>
            </section>
        `
    )
    .join("");
}

fetchRicks();
