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

  if (page != null && words != null) {
    let span;

    for (const word of wordsArr) {
      const para = stringToHTML('<p>');
      words.appendChild(para);

      for (const letter of word) {
        span = stringToHTML(`<span>${letter}</span>`);
        para.appendChild(span);
      }
    }

    let pos = 0;
    let idx = 0;
    document.addEventListener('keydown', (event) => {
      let word = words.childNodes[idx].innerText;

      if (event.key == word[pos]) {
        console.log(event.key);
        pos++;
      }

      if (word.length == pos) {
        pos = 0;
        idx++;
      }
    });

    //   init();
  }
}
