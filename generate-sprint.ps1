#!/usr/bin/env pwsh
<#
.SYNOPSIS
    Automated Release Notes Generator for CX Sprints

.DESCRIPTION
    This script automates the entire release notes generation process:
    1. Creates sprint folder structure
    2. Pulls work items from Azure DevOps
    3. Generates markdown with AI summaries
    4. Generates HTML with dark/light mode
    5. Optionally opens in browser

.EXAMPLE
    .\generate-sprint.ps1

.NOTES
    Version: 1.0
    Created: 2026-02-11
#>

# Script configuration
$ScriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $ScriptPath

# Colors for output
function Write-Step {
    param([string]$Message)
    Write-Host "`n=== $Message ===" -ForegroundColor Cyan
}

function Write-Success {
    param([string]$Message)
    Write-Host "✓ $Message" -ForegroundColor Green
}

function Write-Error-Custom {
    param([string]$Message)
    Write-Host "✗ $Message" -ForegroundColor Red
}

function Write-Info {
    param([string]$Message)
    Write-Host "  $Message" -ForegroundColor Gray
}

# Banner
Write-Host @"

╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║        CX Sprint Release Notes Generator v1.0               ║
║        Automated workflow for sprint documentation          ║
║                                                              ║
�════════════════════════════════════════════════════════════════

"@ -ForegroundColor Cyan

# Check prerequisites
Write-Step "Checking Prerequisites"

# Check Node.js
try {
    $nodeVersion = node --version
    Write-Success "Node.js installed: $nodeVersion"
} catch {
    Write-Error-Custom "Node.js not found. Please install Node.js first."
    exit 1
}

# Check Azure CLI
try {
    $azVersion = az version --query '\"azure-cli\"' -o tsv
    Write-Success "Azure CLI installed: $azVersion"
} catch {
    Write-Error-Custom "Azure CLI not found. Please install Azure CLI first."
    exit 1
}

# Check Azure CLI authentication
try {
    az account show | Out-Null
    Write-Success "Azure CLI authenticated"
} catch {
    Write-Error-Custom "Azure CLI not authenticated. Please run 'az login' first."
    exit 1
}

# Prompt for sprint information
Write-Step "Sprint Information"

# Sprint number
$sprintNum = Read-Host "Enter sprint number (e.g., 03)"
if ([string]::IsNullOrWhiteSpace($sprintNum)) {
    Write-Error-Custom "Sprint number is required"
    exit 1
}
$sprintNum = $sprintNum.PadLeft(2, '0')

# Sprint date (YYYY.MM.DD)
$sprintDate = Read-Host "Enter sprint end date (e.g., 2026.02.18)"
if ([string]::IsNullOrWhiteSpace($sprintDate)) {
    Write-Error-Custom "Sprint date is required"
    exit 1
}

# Validate date format
if ($sprintDate -notmatch '^\d{4}\.\d{2}\.\d{2}$') {
    Write-Error-Custom "Invalid date format. Use YYYY.MM.DD (e.g., 2026.02.18)"
    exit 1
}

# Sprint date range
$dateRange = Read-Host "Enter sprint date range (e.g., January 29 - February 18, 2026)"
if ([string]::IsNullOrWhiteSpace($dateRange)) {
    Write-Error-Custom "Date range is required"
    exit 1
}

# Build paths and identifiers
$iterationPath = "Consumer Experience\CX ($sprintNum) $sprintDate"
$folderName = "CX-$sprintDate"
$folderPath = Join-Path $ScriptPath $folderName
$screenshotsPath = Join-Path $folderPath "screenshots"

# Confirmation
Write-Host "`n"
Write-Host "Sprint Configuration:" -ForegroundColor Yellow
Write-Host "  Iteration Path: $iterationPath" -ForegroundColor White
Write-Host "  Folder Name:    $folderName" -ForegroundColor White
Write-Host "  Date Range:     $dateRange" -ForegroundColor White
Write-Host "`n"

$confirm = Read-Host "Proceed with this configuration? (y/n)"
if ($confirm -ne 'y' -and $confirm -ne 'Y') {
    Write-Info "Cancelled by user"
    exit 0
}

# Step 1: Create folder structure
Write-Step "Step 1: Creating Folder Structure"

if (Test-Path $folderPath) {
    Write-Info "Folder already exists: $folderPath"
    $overwrite = Read-Host "Overwrite existing folder? (y/n)"
    if ($overwrite -ne 'y' -and $overwrite -ne 'Y') {
        Write-Info "Cancelled by user"
        exit 0
    }
} else {
    New-Item -ItemType Directory -Path $folderPath | Out-Null
    Write-Success "Created: $folderPath"
}

if (!(Test-Path $screenshotsPath)) {
    New-Item -ItemType Directory -Path $screenshotsPath | Out-Null
    Write-Success "Created: $screenshotsPath"
}

# Step 2: Enhance work items (pull from ADO)
Write-Step "Step 2: Pulling Work Items from Azure DevOps"
Write-Info "This may take a minute..."

try {
    $enhanceOutput = node enhance-release-notes.js "$iterationPath" 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Error-Custom "Failed to enhance work items"
        Write-Host $enhanceOutput
        exit 1
    }
    Write-Success "Work items enhanced and saved to enhanced-work-items.json"

    # Show summary from output
    $enhanceOutput | Select-String -Pattern "(Total items:|Enhanced:|User Stories:|Spikes:)" | ForEach-Object {
        Write-Info $_.Line.Trim()
    }
} catch {
    Write-Error-Custom "Error running enhance-release-notes.js: $_"
    exit 1
}

# Step 3: Generate markdown
Write-Step "Step 3: Generating Markdown Release Notes"

try {
    $markdownOutput = node create-enhanced-release-notes.js "$iterationPath" "$sprintDate" "$dateRange" "$folderName" 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Error-Custom "Failed to generate markdown"
        Write-Host $markdownOutput
        exit 1
    }
    Write-Success "Markdown created: $folderName/release-notes.md"

    # Show summary from output
    $markdownOutput | Select-String -Pattern "(items|with descriptions)" | ForEach-Object {
        Write-Info $_.Line.Trim()
    }
} catch {
    Write-Error-Custom "Error running create-enhanced-release-notes.js: $_"
    exit 1
}

# Step 4: Generate HTML
Write-Step "Step 4: Generating HTML Release Notes"

try {
    $htmlOutput = node generate-html.js "$folderName/release-notes.md" 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Error-Custom "Failed to generate HTML"
        Write-Host $htmlOutput
        exit 1
    }
    Write-Success "HTML created: $folderName/release-notes.html"

    # Show summary from output
    $htmlOutput | Select-String -Pattern "(Sprint:|Sections:|Total items:)" | ForEach-Object {
        Write-Info $_.Line.Trim()
    }
} catch {
    Write-Error-Custom "Error running generate-html.js: $_"
    exit 1
}

# Success summary
Write-Host "`n"
Write-Host "╔══════════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║                                                              ║" -ForegroundColor Green
Write-Host "║                  ✓ RELEASE NOTES COMPLETE!                   ║" -ForegroundColor Green
Write-Host "║                                                              ║" -ForegroundColor Green
Write-Host "╚══════════════════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host "`n"

Write-Host "Generated Files:" -ForegroundColor Yellow
Write-Host "  📁 Folder:    $folderPath" -ForegroundColor White
Write-Host "  📝 Markdown:  $folderPath\release-notes.md" -ForegroundColor White
Write-Host "  🌐 HTML:      $folderPath\release-notes.html" -ForegroundColor White
Write-Host "  📸 Screenshots: $screenshotsPath (add screenshots here)" -ForegroundColor White
Write-Host "`n"

# Ask to open in browser
$openBrowser = Read-Host "Open release notes in browser? (y/n)"
if ($openBrowser -eq 'y' -or $openBrowser -eq 'Y') {
    $htmlFile = Join-Path $folderPath "release-notes.html"
    Start-Process $htmlFile
    Write-Success "Opened in default browser"
}

Write-Host "`n"
Write-Info "Next steps:"
Write-Info "  1. Add screenshots to: $screenshotsPath"
Write-Info "  2. Review release notes: $folderPath\release-notes.html"
Write-Info "  3. Share with stakeholders"
Write-Host "`n"

Write-Success "Done! 🎉"
