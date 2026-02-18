# CX Release Notes - Azure Static Web App Deployment
# Run this after IT provisions the Static Web App and provides the deployment token.
#
# Usage:
#   .\deploy.ps1 -Token "YOUR_DEPLOYMENT_TOKEN"
#
# The token can be found in Azure Portal:
#   cx-release-notes → Settings → Deployment Token

param(
    [Parameter(Mandatory=$true)]
    [string]$Token
)

$node = 'C:\Users\dperras\AppData\Roaming\fnm\node-versions\v24.13.1\installation\node.exe'
$swa  = 'C:\GitHub-Projects\Release Notes\node_modules\.bin\swa.cmd'
$env:PATH = "C:\Users\dperras\AppData\Roaming\fnm\node-versions\v24.13.1\installation;$env:PATH"

Set-Location 'C:\GitHub-Projects\Release Notes'

Write-Host "`n🚀 Deploying CX Release Notes to Azure Static Web Apps...`n"

& $swa deploy . `
    --deployment-token $Token `
    --app-location "." `
    --output-location "." `
    --env production

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Deployment successful!"
    Write-Host "   Visit: https://cx-release-notes.azurestaticapps.net"
    Write-Host "   (Custom domain can be configured in Azure Portal after first deploy)`n"
} else {
    Write-Host "`n❌ Deployment failed. Check output above for details.`n"
    exit 1
}
