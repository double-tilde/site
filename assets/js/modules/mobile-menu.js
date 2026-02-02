function closeMenuAfterScroll(link, menu) {
  link.addEventListener('click', (e) => {
    if (link.hash) {
      let urlClean = link.href;
      let urlHash = link.hash;
      let res = urlClean.slice(0, -urlHash.length);

      console.log(res);
      console.log(window.location.href);

      if (res == window.location.href) {
        e.preventDefault();
        if (urlHash) {
          urlHash.scrollIntoView({ behavior: 'smooth' });
          setTimeout(() => {
            menu.classList.remove('mobile-animate');
          }, 100);
        }
        return;
      }
    }

    if (link.href !== window.location.href) {
      window.location.href = link.href;
      return;
    }
  });
}

export function toggleMobileMenu() {
  const navMobile = document.getElementById('nav-mobile');
  const mobileOpenBtn = document.getElementById('mobile-open-btn');
  const mobileCloseBtn = document.querySelectorAll('.mobile-close-btn');
  const mobileLinks = document.querySelectorAll('.nav-mobile > ul > li > a');

  mobileCloseBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
      navMobile.classList.remove('mobile-animate');
    });
  });

  mobileLinks.forEach((link) => {
    closeMenuAfterScroll(link, navMobile);
  });

  mobileOpenBtn.addEventListener('click', () => {
    navMobile.classList.add('mobile-animate');
  });
}
