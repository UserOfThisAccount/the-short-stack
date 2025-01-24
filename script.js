const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const resultsContainer = document.getElementById("results");
const loadingIndicator = document.getElementById("loading");

const API_BASE = "https://openlibrary.org"; // Define API_BASE

// Is button clicked? -> search and display books
searchButton.addEventListener("click", async () => {
    const query = searchInput.value.trim();
    if (!query) {
        alert("Please enter a search term.");
        return;
    }

    resultsContainer.innerHTML = ""; // Clear previous results
    loadingIndicator.style.display = "block"; // Show loading

    try {
        // Fetching data from API
        const response = await fetch(
            `${API_BASE}/search.json?q=${encodeURIComponent(query)}`
        );
        if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
        }
        const data = await response.json();

        displayBooks(data.docs);
    } catch (error) {
        console.error("Error fetching data:", error);
        resultsContainer.innerHTML =
            "<p>Failed to fetch data. Please try again later.</p>";
    } finally {
        loadingIndicator.style.display = "none"; // Hide loading
    }
});

function displayBooks(books) {
    if (!books || books.length === 0) {
        resultsContainer.innerHTML =
            "<p>No books found. Try a different search term.</p>";
        return;
    }

    books.forEach((book) => {
        const bookDiv = document.createElement("div");
        bookDiv.className = "book";

        const coverId = book.cover_i;
        const coverUrl = coverId
            ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
            : "https://via.placeholder.com/150";

        bookDiv.innerHTML = `
            <img src="${coverUrl}" alt="${book.title}" />
            <h3>${book.title}</h3>
            <p>${
                book.author_name ? book.author_name.join(", ") : "Unknown Author"
            }</p>
        `;

        resultsContainer.appendChild(bookDiv);
    });
}
