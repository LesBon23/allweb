function searchData() {
            const query = document.getElementById('searchInput').value;
            window.location.href = `file:///F:/Improtent/ImportantOW/New/B.html?search=${encodeURIComponent(query)}`;
        }