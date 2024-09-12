// scripts.js
document.addEventListener("DOMContentLoaded", function() {
    // Function to load a Markdown file and display it
    function loadMarkdown(file, pushToHistory = true) {
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
                        if (href.endsWith('.md')) {
                            loadMarkdown(href, true);
                        } else {
                            window.location.href = href; // For external links
                        }
                    });
                });
            })
            .catch(error => {
                document.getElementById('content').innerHTML = `<p>Error loading file: ${error.message}</p>`;
            });

        // Update the URL and browser history
        if (pushToHistory) {
            history.pushState({ file: file }, '', `?file=${file}`);
        }
    }

    // Function to handle browser navigation
    function handlePopState(event) {
        const file = event.state ? event.state.file : 'README.md';
        loadMarkdown(file, false);
    }

    // Initialize content based on URL parameter or default to README.md
    const urlParams = new URLSearchParams(window.location.search);
    const initialFile = urlParams.get('file') || 'Index.md';
    loadMarkdown(initialFile, false);

    // Add event listener for browser back/forward buttons
    window.addEventListener('popstate', handlePopState);
});
