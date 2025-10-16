import { toast } from './toast.js';

export function copyCode() {
  const copyButtons = document.querySelectorAll('.copy-code');

  copyButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      let codeFigure = e.target.closest('.code-figure');
      let code = codeFigure.querySelector('pre > code');
      const cleanCode = code.cloneNode(true);

      cleanCode
        .querySelectorAll('span[style*="user-select:none"]')
        .forEach((s) => s.remove());

      let codeAsText = cleanCode.textContent;
      navigator.clipboard.writeText(codeAsText);
      toast('Code copied!');
    });
  });
}
