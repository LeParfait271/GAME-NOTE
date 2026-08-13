@echo off
setlocal

cd /d "%~dp0"
set "NODE_BIN=node"

if exist "%~dp0.tools\node\current\node.exe" set "NODE_BIN=%~dp0.tools\node\current\node.exe"
if exist "C:\Users\kokom\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" set "NODE_BIN=C:\Users\kokom\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"

where node >nul 2>&1
if errorlevel 1 if not exist "%NODE_BIN%" (
  echo Node.js est introuvable. Installe Node.js ou utilise le terminal du projet.
  pause
  exit /b 1
)

echo Game Note - apercu local
echo Ouvre ensuite : http://localhost:3000/
echo Laisse cette fenetre ouverte pendant tes verifications.
echo.
"%NODE_BIN%" "%~dp0node_modules\vinext\dist\cli.js" dev --host 127.0.0.1 --port 3000

pause
