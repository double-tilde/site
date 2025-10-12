import { toast } from "./toast.js";

export function copyHeadingLink() {
  let headingLinks = document.querySelectorAll(
    '.article h1>a, .article h2>a, .article h3>a, .article h4>a, .article h5>a, .article h6>a',
  );

  headingLinks.forEach((link) => {
    link.addEventListener('click', async (e) => {
      e.preventDefault();
      try {
        await navigator.clipboard.writeText(link.href);
        toast("Link copied!")
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    });
  });
}
