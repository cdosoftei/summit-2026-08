/*
 * Paper size. Letter is the default; A4 via ?paper=a4.
 *
 * `@page` sits outside the element tree, so it cannot read a custom property or be
 * scoped to an attribute — the rule has to be written at parse time. The matching
 * page-box height travels on <html data-paper>, which the stylesheet can select.
 */
(() => {
  const paper = new URLSearchParams(location.search).get('paper') === 'a4' ? 'a4' : 'letter';
  document.documentElement.dataset.paper = paper;
  const style = document.createElement('style');
  style.textContent = `@page { size: ${paper === 'a4' ? 'A4' : 'Letter'}; margin: 10mm 13mm 9mm; }`;
  document.head.appendChild(style);
})();
