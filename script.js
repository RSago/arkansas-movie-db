async function loadMovies() {
  const data = await fetch("./data/movies.json")
    .then(res => res.json())
    .catch(err => console.error("Could not load JSON", err));

  const container = document.getElementById("movie-container");

  function render(list) {
    container.innerHTML = "";
    list.forEach(movie => {
      container.innerHTML += `
        <div class="movie-card">
          <img src="images/${movie.poster}" alt="${movie.title} poster">
          <h2>${movie.title} (${movie.year})</h2>
          <p><strong>Director:</strong> ${movie.director}</p>
          <p><strong>Location:</strong> ${movie.location}</p>
          <p><strong>Genre:</strong> ${movie.genre}</p>
        </div>
      `;
    });
  }

  render(data);

  document.getElementById("search").addEventListener("input", e => {
    const value = e.target.value.toLowerCase();
    const filtered = data.filter(movie =>
      movie.title.toLowerCase().includes(value)
    );
    render(filtered);
  });
}

loadMovies();
