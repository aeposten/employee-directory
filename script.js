// Fetches all characters from API
const allRicksEl = document.getElementById("all-ricks");
const statusDropdown = document.getElementById("status-select");
const searchElement = document.getElementById("search");

let ricksArray = [];
let filteredRicks = [];
let searchedRicks = [];
let filtered = false;

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
              if (!filtered) {
                renderRicks(ricksArray);
              }
              statusDropdown.addEventListener("change", () => {
                filtered = true;
                filterRicks(ricksArray);
                renderRicks(filteredRicks);
              });
              searchElement.addEventListener("input", () => {
                searchRicks(ricksArray);
                renderRicks(searchedRicks);
              });
            }
          });
      }
    });
}

function filterRicks(ricks) {
  // console.log(statusDropdown.value)
  if (statusDropdown.value === "all") {
    filtered = false;
    renderRicks(ricksArray);
    filteredRicks = ricksArray;
  } else {
    filtered = true;
    filteredRicks = ricks.filter(
      (rick) => rick.status === statusDropdown.value
    );
    //   renderRicks(filteredRicks)
  }
  return filteredRicks;
}

function searchRicks(ricks) {
  if (filtered) {
    searchedRicks = filteredRicks.filter((rick) =>
      rick.name.toLowerCase().includes(searchElement.value.toLowerCase())
    );
  } else {
    searchedRicks = ricks.filter((rick) =>
      rick.name.toLowerCase().includes(searchElement.value.toLowerCase())
    );
  }
  return searchedRicks;
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
