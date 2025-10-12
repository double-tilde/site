export function mainHeight() {
  const main = document.getElementById('main');
  const header = document.getElementById('header');
  const footer = document.getElementById('footer');

  let headerHeight = header.offsetHeight;
  let footerHeight = footer.offsetHeight;
  let totalHeight = headerHeight + footerHeight + 'px';

  main.style.setProperty('--main-height', `calc(100svh - ${totalHeight})`);
}
