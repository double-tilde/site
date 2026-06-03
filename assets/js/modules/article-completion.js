function observe(topOffset, el, callback) {
  if ('IntersectionObserver' in window) {
    const options = {
      root: null,
      rootMargin: `${topOffset}px 0px -80% 0px`,
      threshold: Array.from({ length: 101 }, (_, i) => i * 0.01),
    };

    const observer = new IntersectionObserver((entries) => {
      let entry = entries[0];
      callback(entry.intersectionRatio * 100);
    }, options);

    observer.observe(el);
  }
}

function setWidth(w) {
  const articleCompletion = document.getElementById('article-completion');
  if (articleCompletion != null && w <= 100 && w >= 0) {
    articleCompletion.style.width = `${w}%`;
  }
}

export function articleCompletion() {
  const article = document.getElementById('article');
  let articleHeight;
  if (article != null) {
    articleHeight = article.clientHeight;
    observe(articleHeight * 2, article, (percent) => {
      setWidth(Math.floor(percent));
    });
  }
}
