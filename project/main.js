document.addEventListener('DOMContentLoaded', () => {
    const lastModifiedSpan = document.getElementById('modification-date');
    if (lastModifiedSpan) {
        const lastModified = new Date(document.lastModified);
        lastModifiedSpan.textContent = lastModified.toLocaleString();
    }
});