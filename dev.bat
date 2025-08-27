@echo off
echo Starting KSA Fashion Development Server...
echo.
echo Make sure you have installed dependencies with: npm install
echo.
echo Application will be available at: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.

cross-env NODE_ENV=development nodemon --exec "npx tsx server.ts" --watch server.ts --watch src --ext ts,tsx,js,jsx