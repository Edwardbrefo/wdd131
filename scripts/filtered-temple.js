// Filtered Temple Album Script
document.addEventListener('DOMContentLoaded', function() {
    // Initialize year and time displays
    const yearSpan = document.getElementById('currentyear');
    const timeSpan = document.getElementById('currentTime');
    
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    if (timeSpan) {
        const now = new Date();
        timeSpan.textContent = ` | Last Updated: ${now.toLocaleString()}`;
    }
});
