import { toast } from './toast.js';

export function copyCode() {
  const copyButtons = document.querySelectorAll('.copy-code');

  copyButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      let codeFigure = e.target.closest('.code-figure');
      let code = codeFigure.querySelector('.highlight > pre > code');
      let codeAsText = code.textContent;
      navigator.clipboard.writeText(decodeURIComponent(codeAsText));
      toast('Code copied!');
    });
  });
}
