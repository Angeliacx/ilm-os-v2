$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$logDir = Join-Path $projectRoot "logs"
$logFile = Join-Path $logDir "ilm-local-3000.log"

New-Item -ItemType Directory -Force -Path $logDir | Out-Null
Set-Location $projectRoot

$existingPort = Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue
if ($existingPort) {
  "[$(Get-Date -Format o)] Port 3000 already active. Nothing to start." | Out-File -FilePath $logFile -Encoding utf8 -Append
  exit 0
}

$nextDir = Join-Path $projectRoot ".next"
if (Test-Path -LiteralPath $nextDir) {
  $resolvedRoot = (Resolve-Path -LiteralPath $projectRoot).Path
  $resolvedNext = (Resolve-Path -LiteralPath $nextDir).Path
  if ($resolvedNext.StartsWith($resolvedRoot, [StringComparison]::OrdinalIgnoreCase)) {
    Remove-Item -LiteralPath $resolvedNext -Recurse -Force
  }
}

$env:PORT = "3000"
$env:HOSTNAME = "127.0.0.1"
$env:ILM_PASSWORD = "ilm2026"

"[$(Get-Date -Format o)] Starting ILM local dashboard on http://localhost:3000/" | Out-File -FilePath $logFile -Encoding utf8 -Append

& npm.cmd run dev -- -H 127.0.0.1 -p 3000 *>> $logFile
