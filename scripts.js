// scripts.js
document.addEventListener("DOMContentLoaded", function() {
    // Set default file to README.md or get from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const file = urlParams.get('file') || 'README.md'; // Adjust path if needed

    fetch(`docs/${file}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            // Convert Markdown to HTML
            const htmlContent = marked.parse(data);
            document.getElementById('content').innerHTML = htmlContent;
        })
        .catch(error => {
            document.getElementById('content').innerHTML = `<p>Error loading file: ${error.message}</p>`;
        });
});
