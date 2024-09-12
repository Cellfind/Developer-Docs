document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const file = urlParams.get('file') || 'README.md'; // Default to README.md if no file specified

    fetch(`docs/${file}`)
        .then(response => response.text())
        .then(data => {
            document.getElementById('content').innerHTML = marked(data);
        });
});
