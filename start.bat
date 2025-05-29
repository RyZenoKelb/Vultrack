@echo off
title Vultrack Docker Launcher
color 0A

echo ================================
echo      Vultrack Docker Menu      
echo ================================
echo.
echo 1) Start normally (no rebuild)
echo 2) Rebuild and start
echo 3) Full reset (down + rebuild + volumes)
echo 4) Quit
echo.
set /p choice="Choose an option (1-4): "

if "%choice%"=="1" (
    echo Starting containers...
    docker compose up -d
) else if "%choice%"=="2" (
    echo Rebuilding and starting containers...
    docker compose up --build -d
) else if "%choice%"=="3" (
    echo Performing full reset...
    docker compose down --volumes
    docker compose up --build -d
) else if "%choice%"=="4" (
    echo Exiting...
    exit
) else (
    echo Invalid option.
    pause
)

pause
