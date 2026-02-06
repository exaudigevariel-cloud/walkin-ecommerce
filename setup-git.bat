@echo off
echo ========================================
echo   WALKIN - Complete Git Setup
echo ========================================
echo.

REM Check if Git is configured
git config user.name >nul 2>&1
if errorlevel 1 (
    echo Git user not configured. Let's set it up!
    echo.
    set /p GIT_NAME="Enter your name: "
    set /p GIT_EMAIL="Enter your email: "
    
    git config --global user.name "!GIT_NAME!"
    git config --global user.email "!GIT_EMAIL!"
    echo.
    echo Git configured successfully!
    echo.
)

echo Current Git configuration:
git config user.name
git config user.email
echo.

echo Checking Git status...
git status
echo.

REM Check if already committed
git log --oneline -1 >nul 2>&1
if not errorlevel 1 (
    echo Repository already has commits.
    echo.
    set /p PROCEED="Do you want to make a new commit? (y/n): "
    if /i not "!PROCEED!"=="y" (
        echo Skipping commit...
        goto :push
    )
)

echo Creating initial commit...
git add .
git commit -m "Initial commit: Walkin full-stack e-commerce platform"
echo.

:push
echo ========================================
echo Ready to push to GitHub!
echo ========================================
echo.
echo Before proceeding:
echo 1. Create a repository on GitHub: https://github.com/new
echo    - Repository name: walkin-ecommerce
echo    - DO NOT initialize with README
echo.
echo 2. Copy the repository URL
echo.

set /p REPO_URL="Paste GitHub repository URL (or press Enter to skip): "

if "%REPO_URL%"=="" (
    echo.
    echo Skipping remote push.
    echo You can push later with:
    echo   git remote add origin YOUR_URL
    echo   git push -u origin main
    goto :end
)

REM Check if remote already exists
git remote get-url origin >nul 2>&1
if not errorlevel 1 (
    echo Remote 'origin' already exists. Removing...
    git remote remove origin
)

git remote add origin %REPO_URL%
git branch -M main

echo.
echo Pushing to GitHub...
git push -u origin main

if errorlevel 1 (
    echo.
    echo ========================================
    echo Push failed. Trying with credential helper...
    echo ========================================
    git config --global credential.helper manager
    git push -u origin main
)

:end
echo.
echo ========================================
echo Done!
echo ========================================
echo.
pause
