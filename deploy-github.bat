@echo off
echo ========================================
echo   WALKIN - Auto Push to GitHub
echo ========================================
echo.

REM Check if Git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Git is not installed!
    echo Please install Git from: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo Step 1: Initializing Git repository...
git init
echo.

echo Step 2: Adding all files...
git add .
echo.

echo Step 3: Creating initial commit...
git commit -m "Initial commit: Walkin e-commerce platform"
echo.

echo ========================================
echo IMPORTANT: Manual steps required!
echo ========================================
echo.
echo 1. Create a new repository on GitHub:
echo    - Go to: https://github.com/new
echo    - Repository name: walkin-ecommerce
echo    - Make it Public or Private
echo    - DO NOT initialize with README
echo    - Click "Create repository"
echo.
echo 2. Copy the repository URL (example):
echo    https://github.com/YOUR-USERNAME/walkin-ecommerce.git
echo.

set /p REPO_URL="3. Paste your GitHub repository URL here: "

if "%REPO_URL%"=="" (
    echo ERROR: No URL provided!
    pause
    exit /b 1
)

echo.
echo Step 4: Adding remote repository...
git remote add origin %REPO_URL%
echo.

echo Step 5: Renaming branch to main...
git branch -M main
echo.

echo Step 6: Pushing to GitHub...
git push -u origin main
echo.

if errorlevel 1 (
    echo.
    echo ========================================
    echo ERROR: Push failed!
    echo ========================================
    echo.
    echo Common solutions:
    echo 1. Make sure you're logged in to GitHub
    echo 2. Try: git config --global credential.helper manager
    echo 3. Or generate a Personal Access Token:
    echo    https://github.com/settings/tokens
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo SUCCESS! Code pushed to GitHub!
echo ========================================
echo.
echo Your repository: %REPO_URL%
echo.
echo Next: Deploy to Vercel
echo Run: deploy-vercel.bat
echo.
pause
