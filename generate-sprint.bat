@echo off
REM Simple batch wrapper for the PowerShell script
REM This allows running the script by double-clicking or from cmd.exe

echo.
echo ============================================================
echo    CX Sprint Release Notes Generator
echo ============================================================
echo.

REM Check if PowerShell is available
where pwsh >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Using PowerShell Core...
    pwsh -ExecutionPolicy Bypass -File "%~dp0generate-sprint.ps1"
) else (
    where powershell >nul 2>nul
    if %ERRORLEVEL% EQU 0 (
        echo Using Windows PowerShell...
        powershell -ExecutionPolicy Bypass -File "%~dp0generate-sprint.ps1"
    ) else (
        echo ERROR: PowerShell not found!
        echo Please install PowerShell to use this script.
        pause
        exit /b 1
    )
)

pause
