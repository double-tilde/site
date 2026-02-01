export function darkModeToggle() {
  const button = document.querySelectorAll('.dark-mode-toggle');

  let darkTheme;
  let htmlElement = document.documentElement;

  htmlElement.classList.add('dark');
  button.textContent = 'Light mode';
  darkTheme = true;

  button.forEach((btn) => {
    btn.addEventListener('click', function () {
      darkTheme = !darkTheme;

      if (darkTheme) {
        htmlElement.classList.add('dark');
        btn.textContent = 'Light mode';
        localStorage.theme = 'dark';
      } else {
        htmlElement.classList.remove('dark');
        btn.textContent = 'Dark mode';
        localStorage.theme = 'light';
      }
    });
  });
}
