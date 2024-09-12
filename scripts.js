// scripts.js
document.addEventListener("DOMContentLoaded", function() {
    // Set default file to README.md or get from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const file = urlParams.get('file') || 'README.md'; // Adjust path if needed

    fetch(`docs/${file}`)
        .then(response => response.text())
        .then(data => {
            document.getElementById('content').innerHTML = marked(data); // Convert Markdown to HTML
        })
        .catch(error => {
            document.getElementById('content').innerHTML = `<p>Error loading file: ${error.message}</p>`;
        });
});
