// Fetches all characters from API
const allRicksEl = document.getElementById("all-ricks");
const statusDropdown = document.getElementById("status-select");
let ricksArray = [];
let filteredRicks = [];

function fetchRicks() {
  fetch("https://rickandmortyapi.com/api/character/?name=rick")
    .then((response) => response.json())
    .then((data) => {
      for (let i = 1; i <= data.info.pages; i++) {
        fetch(`https://rickandmortyapi.com/api/character/?page=${i}&name=rick`)
          .then((response) => response.json())
          .then((data) => {
            ricksArray = ricksArray.concat(data.results);
            if (i === 6) {
              renderRicks(ricksArray);
              statusDropdown.addEventListener("change", () => {
                filterRicks(ricksArray);
              });
            }
          });
      }
    });
}

function filterRicks(ricks) {
  // console.log(statusDropdown.value)
  if (statusDropdown.value === 'all') {
    renderRicks(ricksArray);
  } else {
  filteredRicks = ricks.filter((rick) => rick.status === statusDropdown.value);
  console.log(filteredRicks);
  renderRicks(filteredRicks)}
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

// function filterRicks(ricks) {
//     ricks.filter((rick) => rick.status)
// }
