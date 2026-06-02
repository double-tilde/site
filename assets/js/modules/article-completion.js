function observe(topOffset, el, callback) {
  if ('IntersectionObserver' in window) {
    const options = {
      root: null,
      rootMargin: `${topOffset}px 0px -80% 0px`,
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      let entry = entries[0];
      callback(entry.target, entry.isIntersecting);
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
  let len = 0;
  let observed = [];
  let paragraphs = document.querySelectorAll('#article > p');

  const article = document.getElementById('article');
  let articleHeight;
  if (article != null) {
    articleHeight = article.clientHeight * 2;
  }

  paragraphs.forEach((paragraph) => {
    if (paragraph.innerText != '') {
      len++;
    }
  });

  paragraphs.forEach((paragraph) => {
    if (paragraph.innerText != '') {
      observe(articleHeight, paragraph, (el, isInter) => {
        if (isInter) {
          observed.push(el.innerText);
        } else {
          if (observed.at(-1) === el.innerText) observed.pop();
        }

        let width = Math.floor((observed.length / len) * 100);
        setWidth(width);
      });
    }
  });
}
