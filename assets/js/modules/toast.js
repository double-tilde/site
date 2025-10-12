let toastTimeout;

export function toast(msg) {
  const toast = document.getElementById('toast');

  if (toastTimeout) {
    clearTimeout(toastTimeout);
  }

  // reflow
  toast.classList.remove('pop');
  void toast.offsetWidth;
  toast.classList.add('pop');

  toast.textContent = msg;

  const pop = document.querySelector('.toast.pop');
  const computedStyle = window.getComputedStyle(pop);
  const animationDuration = parseFloat(computedStyle.getPropertyValue('animation-duration')) * 1000;

  toastTimeout = setTimeout(function () {
    toast.classList.remove('pop');
  }, animationDuration);
}
