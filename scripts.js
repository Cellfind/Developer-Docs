// scripts.js
document.addEventListener("DOMContentLoaded", function() {
    fetch('README.md') // Adjust the path if needed
        .then(response => response.text())
        .then(data => {
            document.getElementById('content').innerHTML = marked(data); // Use marked library to convert Markdown to HTML
        });
});
