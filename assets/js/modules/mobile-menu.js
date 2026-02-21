function closeMenuAfterScroll(link, menu) {
  link.addEventListener('click', (e) => {
    if (link.hash) {
      let urlHref = link.href;
      let urlHash = link.hash;
      let urlClean = urlHref.slice(0, -urlHash.length);

      let windowHref = window.location.href;
      let windowHash = window.location.hash;
      let windowClean = windowHref;
      if (windowHash) {
        windowClean = windowHref.slice(0, -windowHash.length);
      }

      // if the id element is on the current page
      if (urlClean == windowClean) {
        e.preventDefault();
        let elem = document.querySelector(urlHash);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
          setTimeout(() => {
            menu.classList.remove('mobile-animate');
          }, 100);
        }
        window.location.href = link.href;
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

      let isExpanded = mobileOpenBtn.getAttribute('aria-expanded') === 'true';
      mobileOpenBtn.setAttribute('aria-expanded', !isExpanded);
    });
  });

  mobileLinks.forEach((link) => {
    closeMenuAfterScroll(link, navMobile);
  });

  mobileOpenBtn.addEventListener('click', () => {
    navMobile.classList.add('mobile-animate');

    let isExpanded = mobileOpenBtn.getAttribute('aria-expanded') === 'true';
    mobileOpenBtn.setAttribute('aria-expanded', !isExpanded);
  });
}
