@echo off
echo Starting KSA Fashion Production Server...
echo.
echo Make sure you have built the application with: npm run build
echo.
echo Application will be available at: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.

cross-env NODE_ENV=production tsx server.ts