export function darkModeToggle() {
  const button = document.getElementById('dark-mode-toggle');

  let darkTheme;
  let htmlElement = document.documentElement;

  htmlElement.classList.add('dark');
  button.textContent = 'Light mode';
  darkTheme = true;

  button.addEventListener('click', function () {
    darkTheme = !darkTheme;

    if (darkTheme) {
      htmlElement.classList.add('dark');
      button.textContent = 'Light mode';
      localStorage.theme = 'dark';
    } else {
      htmlElement.classList.remove('dark');
      button.textContent = 'Dark mode';
      localStorage.theme = 'light';
    }
  });
}
