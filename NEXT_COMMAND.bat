@echo off
setlocal enabledelayedexpansion
cd /d "%~dp0next"
title NEXT.DUBAI - LUXURY COMMAND CENTER
color 06

cls
echo.
echo   [SYSTEM] Initializing Dubai Mall Luxury Core...
echo   [SYSTEM] SYNCING GLOBAL_FLAGS... [==========] 100%
timeout /t 1 >nul
cls

:menu
cls
echo.
echo  ╔═════════════════════════════════════════════════════════╗
echo  ║  _   _  _______  __  _____   ____  _   _ ____    _    ___ ║
echo  ║ ^| \ ^| ^|/ ____\ \/ / ^|_   _^| ^|  _ \^| ^| ^| ^| __ )  / \  ^|_ _^|║
echo  ║ ^|  \^| ^|  _^|  \  /    ^| ^|   ^| ^| ^| ^| ^| ^| ^|  _ \ / _ \  ^| ^| ║
echo  ║ ^| ^|\  ^| ^|___ /  \    ^| ^|   ^| ^|_^| ^| ^|_^| ^| ^|_) / ___ \ ^| ^| ║
echo  ║ ^|_^| \_^|_____/_/\_\   ^|_^|   ^|____/ \___/^|____/_/   \_\___^|║
echo  ║                                                         ║
echo  ╠═════════════════════════════════════════════════════════╣
echo  ║  OPERATOR: %USERNAME%                                      
echo  ║  TIMESTAMP: %DATE% - %TIME:~0,5%                             
echo  ║  SYS_ID: 0xDUBAI    [STATUS: PREMIUM ONLINE]            ║
echo  ╠═════════════════════════════════════════════════════════╣
echo  ║                                                         ║
echo  ║   [1]  IGNITE DEV SERVER      (npm run dev)             ║
echo  ║   [2]  BUILD FOR THE FUTURE   (npm run build)           ║
echo  ║   [3]  LAUNCH PRODUCTION      (npm run start)           ║
echo  ║   [4]  EXPLORE CORE FILES     (Explorer)                ║
echo  ║   [5]  VIEW LIVE DASHBOARD    (Web)                     ║
echo  ║   [6]  SYNC DEPENDENCIES      (npm install)             ║
echo  ║   [7]  EXIT COMMAND CENTER                              ║
echo  ║                                                         ║
echo  ╚═════════════════════════════════════════════════════════╝
echo.
set /p choice="  root@next.dubai:~# ACTION [1-7]: "

if "%choice%"=="1" goto dev
if "%choice%"=="2" goto build
if "%choice%"=="3" goto start
if "%choice%"=="4" goto explorer
if "%choice%"=="5" goto inspiration
if "%choice%"=="6" goto install
if "%choice%"=="7" goto exit
echo  [!] INVALID SELECTION. PLEASE TRY AGAIN.
timeout /t 2 >nul
goto menu

:dev
echo.
echo  ======================================================
echo  [PREMIUM] Launching Dubai Mall Immersive Environment...
echo  ======================================================
call npm.cmd run dev
if %errorlevel% neq 0 (
    echo [ERROR] Failed to start dev server.
    pause
)
goto menu

:build
echo.
echo  ======================================================
echo  [LUXURY] Optimizing Infrastructure for Peak Traffic...
echo  ======================================================
call npm.cmd run build
if %errorlevel% neq 0 pause
goto menu

:start
echo.
echo  ======================================================
echo  [GLOBAL] Starting High-Performance Luxury Server...
echo  ======================================================
call npm.cmd run start
if %errorlevel% neq 0 pause
goto menu

:explorer
echo.
echo  ======================================================
echo  [CORE] Opening Workspace Folder...
echo  ======================================================
start explorer .
goto menu

:inspiration
echo.
echo  ======================================================
echo  [SPIRIT] Viewing Live Experience...
echo  ======================================================
start http://localhost:3000
goto menu

:install
echo.
echo  ======================================================
echo  [SYNC] Adding New Potential to the Project...
echo  ======================================================
call npm.cmd install
if %errorlevel% neq 0 pause
goto menu

:exit
echo.
echo  ======================================================
echo  [SYSTEM] Terminating Session...
echo  [SYSTEM] Luxury is a State of Mind. Stay Focused.
timeout /t 2 >nul
exit
