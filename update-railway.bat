@echo off
echo ========================================
echo   UPDATE CODE FOR RAILWAY DEPLOYMENT
echo ========================================
echo.

echo [1/3] Adding changes to Git...
git add .
echo Done!
echo.

echo [2/3] Committing changes...
git commit -m "Security: Use environment variables for admin credentials"
echo Done!
echo.

echo [3/3] Pushing to GitHub...
git push
echo.

if errorlevel 1 (
    echo [ERROR] Push failed!
    echo Make sure you have set up Git remote.
    pause
    exit /b 1
)

echo ========================================
echo  SUCCESS! Code pushed to GitHub
echo ========================================
echo.
echo NEXT STEPS:
echo.
echo 1. Go to Railway Dashboard: https://railway.app/dashboard
echo.
echo 2. Select your project
echo.
echo 3. Click "Variables" tab
echo.
echo 4. Add these variables:
echo    - ADMIN_EMAIL = your-email@domain.com
echo    - ADMIN_PASSWORD = YourStrongPassword123!
echo.
echo 5. Railway will auto-redeploy with new environment variables
echo.
echo 6. Test login at: https://your-project.railway.app/admin.html
echo.
echo ========================================
echo  Your password is now SECURE!
echo ========================================
echo.
pause
