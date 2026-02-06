@echo off
echo ========================================
echo   WALKIN - Auto Deploy to Vercel
echo ========================================
echo.

REM Check if Vercel CLI is installed
vercel --version >nul 2>&1
if errorlevel 1 (
    echo Vercel CLI not found. Installing...
    echo.
    npm install -g vercel
    echo.
)

echo ========================================
echo DEPLOYMENT OPTIONS
echo ========================================
echo.
echo Option 1: Deploy via Vercel CLI (Automated)
echo Option 2: Deploy via Vercel Dashboard (Manual)
echo.

set /p OPTION="Choose option (1 or 2): "

if "%OPTION%"=="1" (
    echo.
    echo Starting Vercel deployment...
    echo.
    echo Follow the prompts:
    echo 1. Login to Vercel (browser will open)
    echo 2. Set up and deploy: YES
    echo 3. Which scope: Choose your account
    echo 4. Link to existing project: NO
    echo 5. Project name: walkin-ecommerce
    echo 6. Directory: ./ (just press Enter)
    echo 7. Override settings: NO
    echo.
    pause
    
    vercel
    
    echo.
    echo ========================================
    echo Deployment initiated!
    echo ========================================
    echo.
    echo Your site will be live in a few moments.
    echo Check the URL provided above.
    echo.
) else (
    echo.
    echo ========================================
    echo Manual Deployment Guide
    echo ========================================
    echo.
    echo 1. Go to: https://vercel.com/new
    echo.
    echo 2. Click "Import Git Repository"
    echo.
    echo 3. Select your walkin-ecommerce repository
    echo.
    echo 4. Configure:
    echo    - Framework Preset: Other
    echo    - Build Command: (leave empty)
    echo    - Output Directory: (leave empty)
    echo    - Install Command: npm install
    echo.
    echo 5. Click "Deploy"
    echo.
    echo 6. Wait 1-2 minutes for deployment
    echo.
    echo Your site will be live at:
    echo https://walkin-ecommerce.vercel.app
    echo.
)

pause
