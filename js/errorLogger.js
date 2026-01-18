// Error Logging System
class ErrorLogger {
    constructor() {
        this.errorStorageKey = 'recipe_formatter_errors';
        this.maxErrors = 100; // Keep last 100 errors
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
                colno: event.colno,
                stack: event.error?.stack || 'No stack trace available',
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent,
                url: window.location.href
            });
        });

        // Catch unhandled promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            this.logError({
                type: 'Unhandled Promise Rejection',
                message: event.reason?.message || 'Unknown promise rejection',
                stack: event.reason?.stack || 'No stack trace available',
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent,
                url: window.location.href
            });
        });

        console.log('🛡️ Error logging system initialized');
    }

    // Log an error to localStorage
    logError(errorData) {
        try {
            let errors = JSON.parse(localStorage.getItem(this.errorStorageKey) || '[]');
            
            // Add new error
            errors.unshift(errorData);
            
            // Keep only the most recent errors
            if (errors.length > this.maxErrors) {
                errors = errors.slice(0, this.maxErrors);
            }
            
            localStorage.setItem(this.errorStorageKey, JSON.stringify(errors));
            
            console.error('📝 Error logged:', errorData);
        } catch (e) {
            console.error('Failed to log error:', e);
        }
    }

    // Get all stored errors
    getErrors() {
        try {
            return JSON.parse(localStorage.getItem(this.errorStorageKey) || '[]');
        } catch (e) {
            console.error('Failed to retrieve errors:', e);
            return [];
        }
    }

    // Clear all stored errors
    clearErrors() {
        localStorage.removeItem(this.errorStorageKey);
        console.log('🗑️ Error log cleared');
    }

    // Download errors as a JSON file
    downloadErrorLog() {
        const errors = this.getErrors();
        if (errors.length === 0) {
            alert('No errors to download');
            return;
        }

        const errorData = {
            generatedAt: new Date().toISOString(),
            totalErrors: errors.length,
            errors: errors
        };

        const blob = new Blob([JSON.stringify(errorData, null, 2)], { 
            type: 'application/json' 
        });
        
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `error-log-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        console.log('📥 Error log downloaded');
    }

    // Get error summary
    getErrorSummary() {
        const errors = this.getErrors();
        if (errors.length === 0) {
            return 'No errors recorded';
        }

        const summary = {
            totalErrors: errors.length,
            latestError: errors[0]?.timestamp,
            errorTypes: {}
        };

        errors.forEach(error => {
            const type = error.type || 'Unknown';
            summary.errorTypes[type] = (summary.errorTypes[type] || 0) + 1;
        });

        return summary;
    }

    // Manually log a custom error
    logCustomError(message, details = {}) {
        this.logError({
            type: 'Custom Error',
            message: message,
            details: details,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href
        });
    }
}

// Initialize error logger
const errorLogger = new ErrorLogger();

// Expose some functions globally for debugging
window.downloadErrorLog = () => errorLogger.downloadErrorLog();
window.clearErrorLog = () => errorLogger.clearErrors();
window.getErrorSummary = () => {
    const summary = errorLogger.getErrorSummary();
    console.log(summary);
    return summary;
};