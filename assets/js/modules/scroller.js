export class Scroller {
  static init() {
    if (document.querySelector('.article-menu')) {
      this.tocLinks = document.querySelectorAll('.article-menu a');
      this.headers = Array.from(this.tocLinks).map((link) => {
        return document.querySelector(`#${link.href.split('#')[1]}`);
      });
      this.ticking = false;
      window.addEventListener('scroll', () => {
        this.onScroll();
      });
    }
  }

  static onScroll() {
    if (!this.ticking) {
      requestAnimationFrame(this.update.bind(this));
      this.ticking = true;
    }
  }

  static update() {
    this.activeHeader ||= this.headers[0];
    let activeIndex = this.headers.findIndex((header) => {
      return header.getBoundingClientRect().top > 180;
    });
    if (activeIndex == -1) {
      activeIndex = this.headers.length - 1;
    } else if (activeIndex > 0) {
      activeIndex--;
    }
    let active = this.headers[activeIndex];
    if (active !== this.activeHeader) {
      this.activeHeader = active;
      this.tocLinks.forEach((link) => link.classList.remove('toc-active'));
      this.tocLinks[activeIndex].classList.add('toc-active');
    }
    this.ticking = false;
  }
}
