const allRicksEl = document.getElementById("all-ricks");
const statusDropdown = document.getElementById("status-select");
const searchElement = document.getElementById("search");

let ricksArray = [];
let filteredRicks = [];
let searchedRicks = [];
let filtered = false;


// Fetches Ricks from Rick and Morty API
function fetchRicks() {
  fetch("https://rickandmortyapi.com/api/character/?name=rick")
    .then((response) => response.json())
    .then((data) => {
      // Sets fetched paged based on number of pages of data returned by api (this number is specified at data.info.pages)
      for (let i = 1; i <= data.info.pages; i++) {
        fetch(`https://rickandmortyapi.com/api/character/?page=${i}&name=rick`)
          .then((response) => response.json())
          .then((data) => {
            concatPages(data, i);
          });
      }
    });
}

// Concatenates all pages of data returned by the API so I can manipulate it in the desired manner
function concatPages(data, i) {
  ricksArray = ricksArray.concat(data.results);
  if (i === data.info.pages) {
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
}

// Filters all ricks based on selected status from dropdown menu
function filterRicks(ricks) {
  if (statusDropdown.value === "all") {
    // "all" ricks are selected do not filter ricks
    filtered = false;
    renderRicks(ricksArray);
    filteredRicks = ricksArray;
  } else {
    // If status is selected from dropdown filter ricks based on selected status
    filtered = true;
    filteredRicks = ricks.filter(
      (rick) => rick.status === statusDropdown.value
    );
  }
  return filteredRicks;
}

// Searches specified array of ricks
function searchRicks(rickArray) {
  searchedRicks = rickArray.filter((rick) =>
    // Sets "name" and user input values to lower case so user's choice of case is ignored when filtering results
    rick.name.toLowerCase().includes(searchElement.value.toLowerCase())
  );
}

// Sets array of ricks to be searched based on if the user has filtered by "status"
function setSearchedRicks(ricks) {
  if (filtered) {
    searchRicks(filteredRicks);
  } else {
    searchRicks(ricks);
  }
  return searchedRicks;
}

// Renders Ricks on the page
function renderRicks(rickArray) {
  allRicksEl.innerHTML = rickArray
    .map(
      ({ image, name, status, location }) =>
        `
            <section class="rick">
                <img class="rick-img" src="${image}"/>
                <div class="rick-headers">
                    <h3 class="rick-name">${name}</h3>
                    <div class="rick-status"><span class="bold">Status:</span> ${status}</div>
                    <div class="rick-location"><span class="bold">Location:</span> ${location.name}</div>
                </div>
                <div class="rick-description">${name} is one of our star employees!</div>
            </section>
        `
    )
    .join("");
}

fetchRicks();
