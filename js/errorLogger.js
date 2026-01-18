// Simple Error Logging for Personal Use
class ErrorLogger {
    constructor() {
        this.errorStorageKey = 'recipe_formatter_errors';
        this.maxErrors = 20; // Keep last 20 errors for personal use
        this.initErrorHandling();
    }

    // Initialize global error handling
    initErrorHandling() {
        // Catch JavaScript errors
        window.addEventListener('error', (event) => {
            this.logError({
                type: 'JavaScript Error',
                message: event.message,
                filename: event.filename,
                lineno: event.lineno,
                timestamp: new Date().toISOString()
            });
        });

        // Catch unhandled promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            this.logError({
                type: 'Promise Rejection',
                message: event.reason?.message || 'Unknown promise rejection',
                timestamp: new Date().toISOString()
            });
        });

        console.log('🛡️ Simple error logging active');
    }

    // Log an error to localStorage and console
    logError(errorData) {
        try {
            let errors = JSON.parse(localStorage.getItem(this.errorStorageKey) || '[]');
            
            // Add new error
            errors.unshift(errorData);
            
            // Keep only recent errors
            if (errors.length > this.maxErrors) {
                errors = errors.slice(0, this.maxErrors);
            }
            
            localStorage.setItem(this.errorStorageKey, JSON.stringify(errors));
            
            console.error('📝 Error logged:', errorData);
        } catch (e) {
            console.error('Failed to log error:', e);
        }
    }

    // Manually log a custom error
    logCustomError(message, details = {}) {
        this.logError({
            type: 'Custom Error',
            message: message,
            details: details,
            timestamp: new Date().toISOString()
        });
    }
}

// Initialize error logger
const errorLogger = new ErrorLogger();