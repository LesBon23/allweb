    // Function to parse query parameters from URL
    function parseQueryParameters(url) {
        var queryParameters = {};
        var queryString = url.split('?')[1];
        if (queryString) {
            var pairs = queryString.split('&');
            for (var i = 0; i < pairs.length; i++) {
                var pair = pairs[i].split('=');
                queryParameters[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
            }
        }
        return queryParameters;
    }

    // Function to search data
    function searchData() {
        var searchQuery = document.getElementById('searchInput').value.toLowerCase().trim();

        if (searchQuery !== '') {
            var filteredData = movies.filter(item => {
                return (
                    item.title.toLowerCase().includes(searchQuery) ||
                    item.description.toLowerCase().includes(searchQuery) ||
                    item.genre.toLowerCase().includes(searchQuery) || // Filter by genre
                    item.genreId.toLowerCase().includes(searchQuery) // Filter by genreId
                );
            });

            // Store filtered data in sessionStorage to pass it to Monisto.html
            sessionStorage.setItem('filteredData', JSON.stringify(filteredData));

            // Construct the new URL with the search query
            var newURL = 'https://lesbon23.github.io/allweb/websitefiles/Monisto.html?search=' + encodeURIComponent(searchQuery);

            // Redirect to the new URL
            window.location.href = newURL;
        } else {
            console.log("Search query is empty.");
            // If search query is empty, display all data in dataContainer
            displayDataInP(movies);
        }
    }

    // Function to display data in dataContainer
    function displayDataInP(dataToDisplay) {
        var container = document.getElementById('dataContainer');
        container.innerHTML = ''; // Clear existing content

        dataToDisplay.forEach(movie => {
            const movieCard = document.createElement('a');
            movieCard.classList.add('movie-card');
            movieCard.href = `https://lesbon23.github.io/allweb/websitefiles/DetailPage.html?movie=${movie.TiltId}`;

            const imageContainer = document.createElement('div'); // Create a container for the image
            imageContainer.classList.add('image-container'); // Add a class for styling

            const image = document.createElement('img');
            image.src = movie.image;
            image.alt = movie.title;

            const textContainer = document.createElement('div'); // Create a container for text
            textContainer.classList.add('text-container'); // Add a class for styling

            const title = document.createElement('h3');
            title.textContent = movie.title;

            const description = document.createElement('p');
            description.textContent = movie.description;
            description.classList.add('description'); // Add description class

            const genre = document.createElement('p');
            genre.textContent = movie.genre;
            genre.classList.add('genre'); // Add genre class

            const genreId = document.createElement('p');
            genreId.textContent = movie.genreId;
            genreId.classList.add('genreId'); // Add genre class

            imageContainer.appendChild(image); // Append the image to the container
            movieCard.appendChild(imageContainer); // Append the image container to the movie card
            textContainer.appendChild(title); // Append title to text container
            textContainer.appendChild(description); // Append description to text container
            textContainer.appendChild(genre); // Append genre to text container
            textContainer.appendChild(genreId); // Append genre to text container

            movieCard.appendChild(textContainer); // Append text container to movie card

            container.appendChild(movieCard); // Append movie card to container
        });
    }

    // Function to handle page load and back navigation
    function handlePageLoad() {
        var currentURL = window.location.href;
        var queryParameters = parseQueryParameters(currentURL);
        var searchQuery = queryParameters['search'];

        if (searchQuery) {
            // If there is a search query in the URL, filter movies and display filtered data
            var filteredData = movies.filter(item => {
                return (
                    item.title.toLowerCase().includes(searchQuery) ||
                    item.description.toLowerCase().includes(searchQuery) ||
                    item.genre.toLowerCase().includes(searchQuery) || // Filter by genre
                    item.genreId.toLowerCase().includes(searchQuery) // Filter by genreId
                );
            });
            displayDataInP(filteredData);
        } else {
            // If no search query, display all movies
            displayDataInP(movies);
        }
    }

    // Event listener for DOMContentLoaded to handle initial page load
    document.addEventListener("DOMContentLoaded", function () {
        handlePageLoad();
    });

    // Event listener for popstate to handle back/forward navigation
    window.addEventListener("popstate", function () {
        handlePageLoad();
    });

    // Event listener for "Enter" key press on search input
    document.getElementById('searchInput').addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent default action (if needed)
            searchData();
        }
    });
