# Modified from Eric Mountford's script on Finance, thank you for your help!
[CmdletBinding()]
Param(
    [switch]$rebuild,
	[switch]$qa
)

function ConfigureNpm() {
#     Write-Host "Setting Proxy and Build Configuration Values for Node Environment" -ForegroundColor Cyan
#     & npm config set proxy http://wcbcproxy:8080 -g
#     CheckLastExit
#     & npm config set https-proxy http://wcbcproxy:8080 -g
#     CheckLastExit
#     & npm config set msvs_version 2015 -g
#     CheckLastExit
    Write-Host "Removing npm proxies"
    & npm config rm proxy -g
    CheckLastExit
    & npm config rm https-proxy -g
    CheckLastExit
    Write-Host "Setting npm VS version to 2017"
    & npm config set msvs_version 2017 -g
    CheckLastExit
}

function CheckLastExit([array]$validCodes = @()) {
    if ($LASTEXITCODE -ne 0) {
        if (-Not($validCodes.Contains($LASTEXITCODE))) {
            throw "Native task error occured"
        }
    }
}

try {

    Push-Location $PSScriptRoot
    $node_modules = "$PSScriptRoot\node_modules"

    Write-Host "script root: $PSScriptRoot"
    Write-Host "node_modules: $node_modules"


    # Setup the Npm Environment
    ConfigureNpm

    Write-Host "Installing local packages" -ForegroundColor Cyan

    if ((Test-Path $node_modules) -and ($rebuild)) {
        Write-Host "Removing $node_modules folder to force rebuild" -ForegroundColor Cyan
        Get-ChildItem -Path $node_modules -Recurse | Remove-Item -Force -Recurse
        Remove-Item $node_modules -Recurse -Force
    }

    Write-Host "Cleaning npm cache and deleting package-lock file" -ForegroundColor Cyan
    Remove-Item $PSScriptRoot\package-lock.json -Force

    if (Test-Path $node_modules) {
        Write-Host "Node dependencies are already installed" -ForegroundColor Cyan
    }
    else {
        Write-Host "Running npm install" -ForegroundColor Cyan
        & npm install
        CheckLastExit
        
        if (-Not (Test-Path $node_modules)) {
            throw "Node modules did not restore properly"
        }
    }

    Write-Host "Running npm build command" -ForegroundColor Cyan

    if ($qa) {
        & npm run build:qa
    }
    else {
        & npm run build
    }

    CheckLastExit

    #Write-Host "Running npm tests" -ForegroundColor Cyan

    # Call twice to workaround weird "operation not permitted" issue
    # See: https://github.com/Medium/phantomjs/issues/19
    #& npm test
    #& npm test

    #CheckLastExit
}
catch {
    $ErrorMessage = $_.Exception.Message
    Write-Error $ErrorMessage
    "##teamcity[buildStatus status='FAILURE']"
    Pop-Location
    exit (1)
}
