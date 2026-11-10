# Emberwood — start all three dev servers
# Run from the emberwood/ directory:
#   powershell -ExecutionPolicy Bypass -File start-dev.ps1

$root     = $PSScriptRoot
$vite     = "$root\node_modules\vite\bin\vite.js"
$tsx      = "$root\node_modules\tsx\dist\cli.mjs"

Write-Host "Starting Emberwood dev servers..." -ForegroundColor Green
Write-Host ""

# Start API
Write-Host "[1/3] API         -> http://localhost:4000" -ForegroundColor Cyan
Start-Process "cmd" -ArgumentList "/k node `"$tsx`" watch src/index.ts" -WorkingDirectory "$root\apps\api"
Start-Sleep -Seconds 3

# Start Storefront
Write-Host "[2/3] Storefront  -> http://localhost:5173" -ForegroundColor Cyan
Start-Process "cmd" -ArgumentList "/k node `"$vite`" --port 5173" -WorkingDirectory "$root\apps\storefront"

# Start Admin
Write-Host "[3/3] Admin       -> http://localhost:5174" -ForegroundColor Cyan
Start-Process "cmd" -ArgumentList "/k node `"$vite`" --port 5174" -WorkingDirectory "$root\apps\admin"

Write-Host ""
Write-Host "All servers starting in separate windows." -ForegroundColor Green
Write-Host ""
Write-Host "  Storefront:  http://localhost:5173" -ForegroundColor White
Write-Host "  Admin:       http://localhost:5174" -ForegroundColor White
Write-Host "  API:         http://localhost:4000" -ForegroundColor White
Write-Host ""
Write-Host "Admin login:"  -ForegroundColor Yellow
Write-Host "  Email:    admin@emberwood.co.uk"  -ForegroundColor White
Write-Host "  Password: Emberwood2026!"  -ForegroundColor White
