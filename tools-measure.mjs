/*
 * Fails loudly if any leaflet side would clip on the given paper.
 *
 * Letter is 17.6mm shorter than A4, so a page that fits A4 is not automatically safe —
 * this measures the real page box the stylesheet produced, per paper.
 *
 *   node tools-measure.mjs            # letter (the default, and what build.sh ships)
 *   node tools-measure.mjs a4
 *   node tools-measure.mjs both
 */
import { chromium } from '/home/ciprian/Work/understudy/node_modules/playwright/index.mjs';

const MM = 96 / 25.4;
const PAPER = { letter: { w: 215.9, h: 279.4 }, a4: { w: 210, h: 297 } };
const MARGIN_X = 26; // 13mm each side, per @page

const arg = (process.argv[2] ?? 'letter').toLowerCase();
const papers = arg === 'both' ? ['letter', 'a4'] : [arg];
if (papers.some((p) => !PAPER[p])) {
  console.error(`unknown paper '${arg}' — expected letter, a4 or both`);
  process.exit(2);
}

const files = ['understudy', 'singleconsole', 'ai-assisted-engineering'];
const browser = await chromium.launch();
const page = await browser.newPage();
let bad = 0;

for (const paper of papers) {
  console.log(`\n${paper.toUpperCase()}`);
  for (const f of files) {
    await page.goto(`file://${process.cwd()}/leaflets/${f}.html?paper=${paper}`);
    await page.emulateMedia({ media: 'print' });
    await page.setViewportSize({
      width: Math.round((PAPER[paper].w - MARGIN_X) * MM),
      height: Math.round(PAPER[paper].h * MM),
    });
    const rows = await page.$$eval('.page', (ps) =>
      ps.map((x) => ({ h: x.scrollHeight, box: x.clientHeight })),
    );
    rows.forEach((r, i) => {
      const over = r.h - r.box;
      if (over > 0) {
        bad++;
        console.log(`  ${f} p${i + 1}: CLIPPED by ${over}px (~${(over / MM).toFixed(1)}mm)`);
      } else {
        console.log(`  ${f} p${i + 1}: ok`);
      }
    });
  }
}

await browser.close();
process.exit(bad ? 1 : 0);
