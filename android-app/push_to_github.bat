@echo off
echo 🚀 Starting Process (Attempt 3 - Privacy Fix)...
echo ---------------------------------------------------

echo 1. Configuring Git User (To bypass privacy error)...
git config user.email "bot@penrate.com"
git config user.name "PenRate Bot"

echo 2. Adding files...
git add .

echo 3. Fixing previous commit signature...
:: This replaces the old commit (with your private email) with a new one
git commit --amend --no-edit --reset-author || git commit -m "Upload Android App"

echo 4. Setting branch to main...
git branch -M main

echo 5. Removing old remote (if exists)...
git remote remove origin 2>nul

echo 6. Adding remote repository...
git remote add origin https://github.com/hussamgalal999/pixshop.git

echo 7. Pushing to GitHub...
echo (If asked for password, use your GitHub Token)
echo ---------------------------------------------------
git push -u origin main --force

echo ---------------------------------------------------
echo ✅ Done! NOW go check GitHub Actions.
pause
