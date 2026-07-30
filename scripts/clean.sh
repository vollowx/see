#!/usr/bin/env bash

set -euo pipefail

cd "$(dirname "${BASH_SOURCE[0]}")/.."

if [ -d "./src" ]; then
  find ./src -type f ! -path "./src/core/shared.d.ts" \( -name "*.js" -o -name "*.d.ts" \) -delete
  echo "done"
else
  echo "src directory not found."
fi
