// Function to create genre buttons
    function createGenreLinks() {
        const categoryBox = document.getElementById('CategoryBox');

        // Filter unique genres
        const uniqueGenres = [];
        const genreSet = new Set();
        movies.forEach(movie => {
            if (!genreSet.has(movie.genreId)) {
                genreSet.add(movie.genreId);
                uniqueGenres.push(movie);
            }
        });

        // Create buttons for unique genres
        uniqueGenres.forEach(movie => {
            const link = document.createElement('a');
            link.textContent = movie.genreId.charAt(0).toUpperCase() + movie.genreId.slice(1);
            link.href = `file:///F:/Improtent/Importent0Z/A2.html?movie=${movie.genreId}`;

            // Default behavior: Open in the same tab
            link.target = '_self';

            // Add genre-specific classes
            link.classList.add('genre-button');
            if (movie.genreId === 'action') {
                link.classList.add('action-button');
            } else if (movie.genreId === 'comedy') {
                link.classList.add('comedy-button');
            } else if (movie.genreId === 'drama') {
                link.classList.add('drama-button');
            } else if (movie.genreId === 'romance') {
                link.classList.add('romance-button');
            } else if (movie.genreId === 'Romance Drama') {
                link.classList.add('romance-drama-button'); // Corrected condition for "romance drama"
            } else if (movie.genreId === 'Comedy Drama') {
                link.classList.add('comedy-drama-button'); // Corrected condition for "comedy drama"
            } else if (movie.genreId === 'Drama Sports') {
                link.classList.add('drama-sports-button'); // Corrected condition for "comedy drama"
            } else if (movie.genreId === 'Action Adventure') {
                link.classList.add('action-adventure-button'); // Corrected condition for "comedy drama"
            } else if (movie.genreId === 'Biographical Sports') {
                link.classList.add('biographical-sports-button'); // Corrected condition for "comedy drama"
            } else if (movie.genreId === 'Drama Comedy') {
                link.classList.add('drama-comedy-button'); // Corrected condition for "comedy drama"
            }

            categoryBox.appendChild(link);
        });
    }

    // Call the function to create links
    createGenreLinks();
