
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
    const testArr = [];

    for (const word of wordsArr) {
      const node = stringToHTML(`${word} `);
      words.appendChild(node);

      testArr.push(word);
    }

    for (const word of testArr) {
      for (const letter of word) {
        document.addEventListener('keydown', (event) => {
          if (event.key == letter) {
            console.log(letter);
          }
        });
      }
    }
    //   init();
  }
}
