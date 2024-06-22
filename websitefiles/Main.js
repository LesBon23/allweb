function searchData() {
            const query = document.getElementById('searchInput').value;
            window.location.href = `https://lesbon23.github.io/allweb/websitefiles/B.html?search=${encodeURIComponent(query)}`;
        }
