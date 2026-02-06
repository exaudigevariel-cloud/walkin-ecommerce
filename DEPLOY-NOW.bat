@echo off
setlocal enabledelayedexpansion

color 0A
echo.
echo  ============================================================
echo   __        ___    _     _  _____ _   _ 
echo   \ \      / / \  ^| ^|   ^| ^|/ /_ _^| \ ^| ^|
echo    \ \ /\ / / _ \ ^| ^|   ^| ' / ^| ^|^|  \^| ^|
echo     \ V  V / ___ \^| ^|___^| . \ ^| ^|^| ^|\^  ^|
echo      \_/\_/_/   \_\_____^|_^|\_\___^|_^| \_^|
echo.
echo   AUTO DEPLOY TO GITHUB ^& VERCEL
echo  ============================================================
echo.

REM Check Git
git --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Git is not installed!
    echo Download from: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo [1/6] Configuring Git...
echo.

REM Configure Git if needed
git config user.name >nul 2>&1
if errorlevel 1 (
    set /p GIT_NAME="Enter your name: "
    set /p GIT_EMAIL="Enter your email: "
    git config --global user.name "!GIT_NAME!"
    git config --global user.email "!GIT_EMAIL!"
    echo Git configured!
) else (
    echo Git already configured as: 
    git config user.name
    git config user.email
)
echo.

echo [2/6] Adding files to Git...
git add .
echo Done!
echo.

echo [3/6] Creating commit...
git commit -m "Initial commit: Walkin full-stack e-commerce platform" >nul 2>&1
if errorlevel 1 (
    git log --oneline -1 >nul 2>&1
    if not errorlevel 1 (
        echo Already committed!
    ) else (
        echo Commit created!
    )
) else (
    echo Commit created!
)
echo.

echo [4/6] Setting up GitHub repository...
echo.
echo ┌────────────────────────────────────────────────────────┐
echo │ ACTION REQUIRED: Create GitHub Repository             │
echo └────────────────────────────────────────────────────────┘
echo.
echo 1. Open: https://github.com/new
echo 2. Repository name: walkin-ecommerce
echo 3. Description: Full-stack e-commerce platform
echo 4. Public or Private (your choice)
echo 5. DO NOT check "Initialize with README"
echo 6. Click "Create repository"
echo.
echo Press any key after creating repository...
pause >nul
echo.

set /p REPO_URL="Paste your GitHub repository URL: "

if "%REPO_URL%"=="" (
    echo [ERROR] No URL provided!
    pause
    exit /b 1
)

echo.
echo [5/6] Connecting to GitHub...
git remote remove origin >nul 2>&1
git remote add origin %REPO_URL%
git branch -M main
echo Done!
echo.

echo [6/6] Pushing to GitHub...
git config --global credential.helper manager >nul 2>&1
git push -u origin main

if errorlevel 1 (
    echo.
    echo [ERROR] Push failed!
    echo.
    echo Try this:
    echo 1. Make sure you're logged in to GitHub
    echo 2. Or use Personal Access Token
    echo    Go to: https://github.com/settings/tokens
    echo.
    pause
    exit /b 1
)

echo.
echo  ============================================================
echo   ✓ SUCCESS! Code pushed to GitHub!
echo  ============================================================
echo.
echo  Repository: %REPO_URL%
echo.
echo  ============================================================
echo   NEXT STEP: Deploy to Vercel
echo  ============================================================
echo.
echo  Option 1 - Automatic (Recommended):
echo    1. Install Vercel CLI: npm install -g vercel
echo    2. Run: vercel
echo    3. Follow prompts to deploy
echo.
echo  Option 2 - Manual (Easiest):
echo    1. Go to: https://vercel.com/new
echo    2. Import your GitHub repository
echo    3. Click Deploy!
echo.
echo  Option 3 - Use our script:
echo    Double-click: deploy-vercel.bat
echo.

set /p DEPLOY_NOW="Deploy to Vercel now? (y/n): "

if /i "!DEPLOY_NOW!"=="y" (
    echo.
    echo Installing Vercel CLI...
    call npm install -g vercel
    echo.
    echo Starting Vercel deployment...
    echo Follow the prompts to login and deploy.
    echo.
    pause
    vercel
)

echo.
echo  ============================================================
echo   🎉 ALL DONE!
echo  ============================================================
echo.
pause
