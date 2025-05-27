function searchMovies() {
  const query = document.getElementById("searchInput").value.trim().toLowerCase();
  const list = document.getElementById("movieList");

  list.innerHTML = `
    <div class="spinner-container">
      <div class="loading-spinner"></div>
    </div>`;

  if (query === "fast") {
    fetch(`https://www.omdbapi.com/?apikey=b2089589&s=${query}`)
      .then(response => response.json())
      .then(data => {
        setTimeout(() => {
          if (data.Response === "True") {
            list.innerHTML = "";
            data.Search.forEach(movie => {
              const movieItem = document.createElement("div");
              movieItem.className = "movie";
              movieItem.innerHTML = `
                <img src="${movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/150x220?text=No+Image'}" 
                     alt="${movie.Title}" />
                <div><strong>${movie.Title}</strong> (${movie.Year})</div>
              `;
              list.appendChild(movieItem);
            });
          } else {
            list.innerHTML = `<p>No results found.</p>`;
          }
        }, 1000);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setTimeout(() => {
          list.innerHTML = `<p>Error fetching movies.</p>`;
        }, 1000);
      });
  } else {
    list.innerHTML = `<p>No movies found. Please try again.</p>`;
  }
}

// ✅ Toggle hamburger menu for mobile
function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("show");
}
