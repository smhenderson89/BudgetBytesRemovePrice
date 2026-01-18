# Error Logging System

This folder is designed to store error logs from the Recipe Formatter website.

## How It Works

The error logging system captures:
- JavaScript runtime errors
- Unhandled promise rejections
- Custom application errors
- User interaction failures

## Accessing Error Logs

### Method 1: Admin Panel (Recommended)
1. Open the website in your browser
2. Press **Ctrl+Shift+E** to show/hide the admin panel
3. Use the admin panel buttons:
   - **View Summary**: See error statistics
   - **Download Errors**: Download errors as JSON file
   - **Clear Errors**: Remove all stored errors
   - **Test Error**: Generate a test error for verification

### Method 2: Browser Console
Open browser developer tools (F12) and use these commands:
```javascript
getErrorSummary()    // View error statistics
downloadErrorLog()   // Download errors as JSON file
clearErrorLog()      // Clear all errors
```

## Error Storage

- Errors are stored in browser localStorage
- Maximum 100 errors kept (oldest are removed)
- Errors include:
  - Timestamp
  - Error type and message
  - Stack trace
  - Browser information
  - Page URL

## Downloaded Error Files

Error logs are downloaded as JSON files with format:
- `error-log-YYYY-MM-DD.json`

Each file contains:
- Generation timestamp
- Total error count
- Full error details array

## File Storage Limitation

⚠️ **Important**: This is a client-side application, so errors are stored in browser localStorage, not directly as files in this folder. To save error logs as actual files, use the "Download Errors" feature in the admin panel.

## Production Deployment

For production use, consider:
1. Server-side error logging
2. Error reporting services (Sentry, LogRocket)
3. Real-time error monitoring
4. Database storage for error persistence

## Troubleshooting

If the error logging system isn't working:
1. Check browser console for JavaScript errors
2. Verify localStorage is enabled
3. Ensure all script files are loading properly
4. Test with the "Test Error" button in admin panel