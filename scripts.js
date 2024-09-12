// scripts.js
document.addEventListener("DOMContentLoaded", function() {
    // Function to load a Markdown file and display it
    function loadMarkdown(file) {
        fetch(`docs/${file}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                // Convert Markdown to HTML and update content
                const htmlContent = marked.parse(data);
                document.getElementById('content').innerHTML = htmlContent;
                
                // Add event listeners for links in the content
                document.querySelectorAll('#content a').forEach(link => {
                    link.addEventListener('click', function(event) {
                        event.preventDefault();
                        const href = this.getAttribute('href');
                        loadMarkdown(href);
                    });
                });
            })
            .catch(error => {
                document.getElementById('content').innerHTML = `<p>Error loading file: ${error.message}</p>`;
            });
    }

    // Get file from URL parameter or default to README.md
    const urlParams = new URLSearchParams(window.location.search);
    const file = urlParams.get('file') || 'Index.md'; // Adjust path if needed
    loadMarkdown(file);
});
