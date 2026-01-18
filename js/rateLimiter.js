// Rate limiting configuration
const RATE_LIMIT = 15; // Maximum requests per minute
const TIME_WINDOW = 60000; // 1 minute in milliseconds
const STORAGE_KEY = 'recipe_formatter_usage';

// Rate limiting function
function isRateLimited() {
    const now = Date.now();
    let usageData = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    
    // Remove entries older than the time window
    usageData = usageData.filter(timestamp => now - timestamp < TIME_WINDOW);
    
    // Check if we've hit the limit
    if (usageData.length >= RATE_LIMIT) {
        return true;
    }
    
    // Add current timestamp and save
    usageData.push(now);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(usageData));
    
    return false;
}

function showRateLimitMessage() {
    const popup = document.getElementById('success-popup');
    const popupText = document.querySelector('.popup-text');
    
    // Temporarily change popup to show rate limit message
    popup.style.backgroundColor = '#dc3545'; // Red color
    popupText.textContent = '⛔ Rate limit exceeded. Please wait before trying again.';
    popup.classList.add('show');
    
    setTimeout(() => {
        popup.classList.remove('show');
        // Reset popup back to success styling
        setTimeout(() => {
            popup.style.backgroundColor = '#28a745'; // Green color
            popupText.textContent = '✅ Formatting removed successfully!';
        }, 300);
    }, 4000); // Show for 4 seconds for rate limit message
}