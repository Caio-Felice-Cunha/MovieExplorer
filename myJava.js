const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';

const main = document.getElementById("section");
const form = document.getElementById("form");
const query = document.getElementById("query");

returnMovies('/api/movies');

function returnMovies(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data.results); // Log movie data to the console
            displayMovies(data.results);
        })
        .catch(error => console.error('Error fetching movies:', error));
}

function displayMovies(movies) {
    main.innerHTML = ''; // Clear previous results
    movies.forEach(element => {
        const div_card = document.createElement('div');
        div_card.setAttribute('class', 'card');

        const div_row = document.createElement('div');
        div_row.setAttribute('class', 'row');

        const div_column = document.createElement('div');
        div_column.setAttribute('class', 'column');

        const image = document.createElement('img');
        image.setAttribute('class', 'thumbnail');
        image.setAttribute('id', 'image');
        image.src = IMG_PATH + element.poster_path;

        const title = document.createElement('h3');
        title.setAttribute('id', 'title');
        title.innerHTML = `${element.title}`;

        const center = document.createElement('center');
        center.appendChild(image);
        
        div_card.appendChild(center);
        div_card.appendChild(title);
        div_column.appendChild(div_card);
        div_row.appendChild(div_column);

        main.appendChild(div_row);
    });
}

// Event listener for the search form
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchItem = query.value;

    if (searchItem) {
        // Fetch search results from the backend API
        returnMovies(`/api/movies/search?query=${encodeURIComponent(searchItem)}`);
        query.value = ""; // Clear the search field
    }
});