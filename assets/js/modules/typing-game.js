function stringToHTML(str) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(str, 'text/html');
  return doc.body.firstChild;
}

export function typingGame() {
  const page = document.getElementById('typing');
  const words = document.querySelector('.words');
  const wordsArr = [
    'developer',
    'philosophy',
    'music',
    'computer',
    'tea',
    'guitar',
    'tennis',
    'linux',
    'reading',
    'design',
    'debate',
    'technical',
    'penguin',
    'walk',
    'morning',
    'think',
    'learn',
    'do',
    'listen',
    'game',
    'memory',
    'explore',
    'history',
    'graphics',
    'programming',
    'terminal',
    'vim',
    'books',
    'obsidian',
    'notes',
    'tutorials',
    'conversation',
    'audio',
    'exercise',
    'films',
    'cats',
    'typing',
    'web',
    'plugin',
    'code',
    'algorithms',
    'go',
    'custom',
    'free',
    'foss',
    'keyboard',
    'pedal',
    'gym',
  ];

  const cursor = document.getElementById('cursor');

  if (page != null && words != null) {
    for (const word of wordsArr) {
      const para = stringToHTML('<p>');
      words.appendChild(para);

      for (const letter of word) {
        const span = stringToHTML(`<span>${letter}</span>`);
        para.appendChild(span);
      }

      const space = stringToHTML(`<span>&nbsp;</span>`);
      para.appendChild(space);
    }

    let idx = 0;
    let pos = 0;

    document.addEventListener('keydown', (event) => {
cursor.classList.remove("cursor-animate")

      let word = words.childNodes[idx];
      let letter = word.childNodes[pos];
      let letterWidth = letter.offsetWidth;
      let cursorPosition = parseInt(cursor.style.left, 10) || 0;

      if (event.key == 'Backspace') {
        if (pos == 0 && idx > 0) {
          idx--;
          word = words.childNodes[idx];
          pos = word.childNodes.length - 1;
          letter = word.childNodes[pos];
        } else {
          if (pos > 0) {
            pos--;
          } else {
            pos = 0;
          }
          word = words.childNodes[idx];
          letter = word.childNodes[pos];
        }
        cursor.style.left = cursorPosition - letterWidth + 'px';
        letter.classList.remove('correct');
        letter.classList.remove('incorrect');
        return;
      } else if (event.key == letter.innerText) {
        letter.classList.add('correct');
        cursor.style.left = cursorPosition + letterWidth + 'px';
      } else if (event.code == 'Space' && pos == word.childNodes.length - 1) {
        letter.classList.add('correct');
        cursor.style.left = cursorPosition + letterWidth + 'px';
      } else if (event.key != letter.innerText) {
        letter.classList.add('incorrect');
        cursor.style.left = cursorPosition + letterWidth + 'px';
      }

      if (word.childNodes.length - 1 <= pos) {
        pos = 0;
        idx++;
        return;
      }

      pos++;
    });

    //   init();
  }
}
