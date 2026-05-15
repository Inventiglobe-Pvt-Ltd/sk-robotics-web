# This script moves the SK Robotics project to your Desktop and cleans up the scratch folder
$Source = "C:\Users\inven\.gemini\antigravity\scratch\sk-robotics-web"
$Destination = "$HOME\Desktop\sk-robotics-web"

if (Test-Path $Source) {
    Write-Host "Moving project to Desktop..." -ForegroundColor Gold
    Move-Item -Path $Source -Destination $Destination -Force
    Write-Host "Success! Project moved to: $Destination" -ForegroundColor Green
    explorer.exe $Destination
} else {
    Write-Host "Source folder not found. It may have already been moved." -ForegroundColor Red
}

Write-Host "Press any key to close..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
