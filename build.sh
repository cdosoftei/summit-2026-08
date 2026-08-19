#!/usr/bin/env bash
# Render the leaflets to PDF. Headless Chrome, local fonts, no network.
#
#   ./build.sh          # Letter (the default, and what gets printed)
#   ./build.sh a4       # A4, written alongside as <name>-a4.pdf
#   ./build.sh both
set -euo pipefail

cd "$(dirname "$0")"
CHROME="${CHROME:-google-chrome}"
OUT="leaflets"

case "${1:-letter}" in
  letter) PAPERS=(letter) ;;
  a4)     PAPERS=(a4) ;;
  both)   PAPERS=(letter a4) ;;
  *) echo "usage: $0 [letter|a4|both]" >&2; exit 2 ;;
esac

# Letter is 17.6mm shorter than A4, so a page that fits one is not automatically safe on
# the other. Refuse to ship a silently clipped leaflet.
for paper in "${PAPERS[@]}"; do
  node tools-measure.mjs "$paper" >/dev/null || {
    echo "✗ ${paper}: a page would clip — run 'node tools-measure.mjs ${paper}' for detail" >&2
    exit 1
  }
done

for paper in "${PAPERS[@]}"; do
  # Letter keeps the plain name because it is the one that gets handed out.
  suffix=""; [[ "$paper" == "a4" ]] && suffix="-a4"
  for name in understudy singleconsole ai-assisted-engineering; do
    echo "→ ${name}${suffix}.pdf  (${paper})"
    "$CHROME" \
      --headless=new --disable-gpu --no-pdf-header-footer \
      --force-color-profile=srgb --virtual-time-budget=4000 \
      --print-to-pdf="${OUT}/${name}${suffix}.pdf" \
      "file://${PWD}/${OUT}/${name}.html?paper=${paper}" 2>/dev/null
  done
done

echo
ls -lh "${OUT}"/*.pdf
echo
echo "Print double-sided, colour, US Letter, 'scale to fit' OFF. 10 copies each."
