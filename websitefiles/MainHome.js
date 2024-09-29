// Function to display a specific range of movies
function displayMovies(containerId, start, end) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous movies

    for (let i = start; i <= end && i < movies.length; i++) {
        const movie = movies[i];
        const movieCard = createMovieCard(movie);
        container.appendChild(movieCard);
    }
}

// Function to create a movie card element
function createMovieCard(movie) {
    const movieCard = document.createElement('a');
    movieCard.classList.add('movie-card');
    movieCard.href = `https://lesbon23.github.io/allweb/websitefiles/DetailPage.html?movie=${movie.TiltId}`; // Set href to open in the same tab with TiltId

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container');

    const image = document.createElement('img');
    image.src = movie.image;
    image.alt = movie.title;

    const textContainer = document.createElement('div');
    textContainer.classList.add('text-container');

    const title = document.createElement('h3');
    title.textContent = movie.title;

    const description = document.createElement('p');
    description.textContent = movie.description;
    description.classList.add('description');

    const genre = document.createElement('p');
    genre.textContent = movie.genre;
    genre.classList.add('genre');

    imageContainer.appendChild(image);
    movieCard.appendChild(imageContainer);
    textContainer.appendChild(title);
    textContainer.appendChild(description);
    textContainer.appendChild(genre);
    movieCard.appendChild(textContainer);

    // Add click event listener to open B.html
    movieCard.addEventListener('click', function(event) {
        // Check if Ctrl or Cmd is pressed
        if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            window.open(`https://lesbon23.github.io/allweb/websitefiles/DetailPage.html?movie=${movie.TiltId}`, '_blank');
        } else {
            // Allow default action (open in the same tab)
        }
    });

    return movieCard;
}

// Function to generate hyperlink pagination buttons
function generatePaginationButtons() {
    const paginationBox = document.getElementById('paginationBox');
    paginationBox.innerHTML = ''; // Clear previous pagination buttons

    const numPages = Math.ceil(movies.length / 6); // 6 movies per page
    for (let i = 0; i < numPages; i++) {
        const pageLink = document.createElement('a');
        pageLink.href = `?page=${i + 1}`;
        pageLink.textContent = i + 1;
        if (i === 0) {
            pageLink.classList.add('active');
        }
        pageLink.addEventListener('click', function(event) {
            event.preventDefault();
            const start = i * 6;
            const end = start + 5;
            displayMovies('CardContainer', start, end);

            // Remove active class from all pagination links
            const allLinks = paginationBox.querySelectorAll('a');
            allLinks.forEach(link => link.classList.remove('active'));

            // Add active class to the clicked link
            pageLink.classList.add('active');
            history.pushState(null, '', `?page=${i + 1}`);
        });
        paginationBox.appendChild(pageLink);
    }
}

// Function to get URL parameter by name
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Function to highlight the active page link
function highlightActivePage() {
    const page = getUrlParameter('page') || 1;
    const paginationBox = document.getElementById('paginationBox');
    const allLinks = paginationBox.querySelectorAll('a');
    allLinks.forEach(link => {
        if (link.href.includes(`?page=${page}`)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// On page load, display the appropriate set of movies based on the URL parameter
document.addEventListener('DOMContentLoaded', function() {
    const page = getUrlParameter('page') || 1;
    const start = (page - 1) * 6;
    const end = start + 5;
    displayMovies('CardContainer', start, end);

    // Generate hyperlink pagination buttons
    generatePaginationButtons();

    // Highlight the active page link
    highlightActivePage();

    // Additional displays and intervals
    displayMovies('secCardContainer', 0, 3);
    displayMovies('thardCardContainer', 0, 3);
    displayMovies('PopMovies', 0, 3);
});

// Handle popstate event to update active class when using browser navigation
window.addEventListener('popstate', function() {
    const page = getUrlParameter('page') || 1;
    const start = (page - 1) * 6;
    const end = start + 5;
    displayMovies('CardContainer', start, end);
    highlightActivePage();
});










// Skeleton Loading Function
function showSkeletonLoading(containerId, numSkeletons) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous content

    for (let i = 0; i < numSkeletons; i++) {
        const skeletonCard = document.createElement('div');
        skeletonCard.classList.add('movie-card');

        const skeletonImage = document.createElement('div');
        skeletonImage.classList.add('skeleton', 'image', 'loading');

        const skeletonText = document.createElement('div');
        skeletonText.classList.add('skeleton', 'text', 'loading');

        const skeletonGenre = document.createElement('div');
        skeletonGenre.classList.add('skeleton', 'genre', 'loading');

        skeletonCard.appendChild(skeletonImage);
        skeletonCard.appendChild(skeletonText);
        skeletonCard.appendChild(skeletonGenre);

        container.appendChild(skeletonCard);
    }
}

// On page load, show skeleton loading for all containers
document.addEventListener('DOMContentLoaded', function() {
    // Show skeleton loading for main CardContainer
    showSkeletonLoading('CardContainer', 6); // Show 6 skeleton cards

    // Show skeleton loading for PopMovies
    showSkeletonLoading('PopMovies', 4); // Show 3 skeleton cards

    // Show skeleton loading for secCardContainer
    showSkeletonLoading('secCardContainer', 4); // Show 3 skeleton cards

    // Show skeleton loading for thardCardContainer
    showSkeletonLoading('thardCardContainer', 4); // Show 3 skeleton cards

    // Simulate loading movies after 2 seconds (replace this with actual movie loading logic)
    setTimeout(function() {
        const start = 0;
        const end = 5;
        displayMovies('CardContainer', start, end);
        displayMovies('PopMovies', start, 3);
        displayMovies('secCardContainer', start, 3);
        displayMovies('thardCardContainer', start, 3);
    }, 2000); // 2 seconds delay
});
