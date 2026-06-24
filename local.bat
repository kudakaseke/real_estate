@echo off
setlocal
cd /d "%~dp0"

set "PORT=2210"

echo Starting local server at http://localhost:%PORT% ...

where php >nul 2>nul
if %ERRORLEVEL%==0 (
  php -S localhost:%PORT%
  goto :eof
)

if exist "C:\xampp\php\php.exe" (
  "C:\xampp\php\php.exe" -S localhost:%PORT%
  goto :eof
)

if exist "C:\php\php.exe" (
  "C:\php\php.exe" -S localhost:%PORT%
  goto :eof
)

echo PHP was not found. Install PHP or add it to PATH to run contact.php locally.
pause
