let currentMovies = [];

function searchMovies() {
  const query = document.getElementById("searchInput").value.trim();
  const list = document.getElementById("movieList");

  list.classList.remove("movie-list");
  list.innerHTML = `
    <div class="spinner-container">
      <div class="loading-spinner"></div>
    </div>`;

  if (!query) {
    list.innerHTML = `<div class="center-message"><p>Please enter a movie title or keyword.</p></div>`;
    return;
  }

  fetch(`https://www.omdbapi.com/?apikey=b2089589&s=${encodeURIComponent(query)}`)
    .then(response => response.json())
    .then(data => {
      setTimeout(() => {
        if (data.Response === "True") {
          currentMovies = data.Search;
          displayMovies(currentMovies);
        } else {
          list.innerHTML = `<div class="center-message"><p>We couldn't find a movie with that title. Please try again.</p></div>`;
        }
      }, 1000);
    })
    .catch(error => {
      console.error("Error fetching data:", error);
      list.innerHTML = `<div class="center-message"><p>Error fetching movies.</p></div>`;
    });
}

function displayMovies(movies) {
  const list = document.getElementById("movieList");
  list.innerHTML = "";
  list.classList.add("movie-list");

  movies.forEach(movie => {
    const movieItem = document.createElement("div");
    movieItem.className = "movie";
    movieItem.innerHTML = `
      <img src="${movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/150x220?text=No+Image'}" 
           alt="${movie.Title}" />
      <div><strong>${movie.Title}</strong> (${movie.Year})</div>
    `;
    list.appendChild(movieItem);
  });
}

function sortMovies() {
  const sortOrder = document.getElementById("sortOrder").value;
  if (!currentMovies.length) return;

  currentMovies.sort((a, b) => {
    const yearA = parseInt(a.Year);
    const yearB = parseInt(b.Year);

    if (isNaN(yearA) || isNaN(yearB)) return 0;

    return sortOrder === "newest" ? yearB - yearA : yearA - yearB;
  });

  displayMovies(currentMovies);
}

function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("show");
}
