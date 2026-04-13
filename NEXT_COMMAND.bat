@echo off
setlocal enabledelayedexpansion
cd /d "%~dp0next"
title NEXT - THE NEXT BIG THING
color 0E

cls
echo.
echo   Igniting Potential...
echo   [====================] 100%
timeout /t 1 >nul
cls

:menu
cls
echo.
echo  ╔═════════════════════════════════════════════════════════╗
echo  ║   _   _  _______  __  _____   ____ ___ ____             ║
echo  ║  ^| \ ^| ^|/ ____\ \/ / ^|_   _^| ^|  _ \_ _/ ___^|            ║
echo  ║  ^|  \^| ^|  _^|  \  /    ^| ^|   ^| ^|_) ^| ^| ^|  _             ║
echo  ║  ^| ^|\  ^| ^|___ /  \    ^| ^|   ^|  _ < ^| ^| ^|_^| ^|            ║
echo  ║  ^|_^| \_^|_____/_/\_\   ^|_^|   ^|_^| \_\___\____^|            ║
echo  ║                                                         ║
echo  ╠═════════════════════════════════════════════════════════╣
echo  ║  PROJECT: THE NEXT BIG THING                            ║
echo  ║  STATUS: POSITIVE VIBES ONLY [ONLINE]                   ║
echo  ║  SYS_ID: 0x7777     [OPTIMIZED FOR GROWTH]              ║
echo  ╠═════════════════════════════════════════════════════════╣
echo  ║                                                         ║
echo  ║   [1]  IGNITE DEV SERVER      (npm run dev)             ║
echo  ║   [2]  BUILD FOR THE FUTURE   (npm run build)           ║
echo  ║   [3]  LAUNCH PRODUCTION      (npm run start)           ║
echo  ║   [4]  EXPLORE CORE FILES     (Explorer)                ║
echo  ║   [5]  VIEW INSPIRATION       (Web)                     ║
echo  ║   [6]  INSTALL POTENTIAL      (npm install)             ║
echo  ║   [7]  EXIT TERMINAL                                    ║
echo  ║                                                         ║
echo  ╚═════════════════════════════════════════════════════════╝
echo.
set /p choice="  root@next-thing:~# ACTION [1-7]: "

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
echo  [GROWTH] Launching Next.js Immersive Environment...
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
echo  [FUTURE] Optimizing for Peak Performance...
echo  ======================================================
call npm.cmd run build
if %errorlevel% neq 0 pause
goto menu

:start
echo.
echo  ======================================================
echo  [GLOBAL] Starting Production Server...
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
echo  [SPIRIT] Viewing Live Inspiration...
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
echo  [SYSTEM] Stay Focused. Stay Positive.
timeout /t 2 >nul
exit
