// script.js

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const resultsContainer = document.getElementById("results");

// Base API URL
const API_BASE = "https://openlibrary.org";

// Fetch and display books when search button is clicked
searchButton.addEventListener("click", async () => {
    const query = searchInput.value.trim();
    if (!query) {
        alert("Please enter a search term.");
        return;
    }

    try {
        // Fetch data from API
        const response = await fetch(
            `${API_BASE}/search.json?q=${encodeURIComponent(query)}`
        );
        if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
        }
        const data = await response.json();

        // Display results
        displayBooks(data.docs);
    } catch (error) {
        console.error("Error fetching data:", error);
        resultsContainer.innerHTML =
            "<p>Failed to fetch data. Please try again later.</p>";
    }
});

// Function to display books
function displayBooks(books) {
    resultsContainer.innerHTML = ""; // Clear previous results

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
