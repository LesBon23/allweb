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
            link.href = `https://lesbon23.github.io/allweb/websitefiles/A2.html?movie=${movie.genreId}`;

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
            } else if (movie.genreId === 'series') {
                link.classList.add('series-button');
            }

            // Aap yahan condition specify kar sakte hain
            // Example: if (someCondition) { link.target = '_blank'; }
            if (movie.genreId === 'someOtherCondition') {
                link.target = '_blank';
            }

            categoryBox.appendChild(link);
        });
    }

    // Call the function to create links
    createGenreLinks();
