export function toggleMobileMenu() {
  const navMobile = document.getElementById('nav-mobile');
  const mobileOpenBtn = document.getElementById('mobile-open-btn');
  const mobileCloseBtn = document.querySelectorAll('.mobile-close-btn');

  mobileCloseBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
      navMobile.classList.toggle('mobile-animate');
    });
  });

  mobileOpenBtn.addEventListener('click', () => {
    navMobile.classList.toggle('mobile-animate');
  });
}
