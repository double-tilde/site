let PLAYING = true;
// TODO: change to 30
let COUNTDOWN = 500;
let intervalID;

function stringToHTML(str) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(str, 'text/html');
  return doc.body.firstChild;
}

function startTimer() {
  if (PLAYING) {
    intervalID = setInterval(() => {
      COUNTDOWN = COUNTDOWN - 1;
      if (COUNTDOWN <= 0) {
        PLAYING = false;
        clearInterval(intervalID);
      }
    }, 1000);
  }
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
    'laptop',
    'source',
    'build',
    'internet',
    'machine',
    'theory',
    'try',
    'interest',
    'css',
    'aeons',
    'neo',
    'enjoy',
    'travel',
    'interface',
    'focus',
    'log',
    'space',
    'nebula',
    'tech',
    'program',
    'crafting',
  ];

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

    const cursor = document.getElementById('cursor');
    let idx = 0;
    let pos = 0;
    let keypress = 0;
    let topRow = [];

    document.addEventListener('keydown', (event) => {
      if (event.key == 'Space') {
        event.preventDefault();
      }

      if (
        event.key == 'Alt' ||
        event.key == 'Control' ||
        event.key == 'Escape' ||
        event.key == 'Meta' ||
        event.key == 'Tab' ||
        event.key == 'Shift'
      ) {
        event.preventDefault();
        return;
      }

      if (PLAYING) {
        if (keypress == 0) {
          startTimer();
        }
        keypress++;
        // console.log(keypress);

        cursor.classList.remove('cursor-animate');

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
          } else if (pos > 0) {
            pos--;
          } else {
            pos = 0;
          }
          word = words.childNodes[idx];
          letter = word.childNodes[pos];
          if (cursorPosition > 0) {
            cursor.style.left = cursorPosition - letterWidth + 'px';
          }
          letter.classList.remove('correct');
          letter.classList.remove('incorrect');
          return;
        }

        let next = words.childNodes[idx + 1];
        if (
          word.offsetTop == 0 &&
          next.offsetTop != 0 &&
          pos == word.childNodes.length - 1
        ) {
          if (event.code == 'Space' && pos == word.childNodes.length - 1) {
            letter.classList.add('correct');
            cursor.style.left = '0px';
          }
        } else if (
          event.key == letter.innerText ||
          (event.code == 'Space' && pos == word.childNodes.length - 1)
        ) {
          letter.classList.add('correct');
          cursor.style.left = cursorPosition + letterWidth + 'px';
        } else {
          letter.classList.add('incorrect');
          cursor.style.left = cursorPosition + letterWidth + 'px';
        }

        console.log('tr', topRow);
        if (word.offsetTop == 0) {
          let prev;
          if (topRow.length > 0) {
            prev = topRow.at(-1);
          }

          if (prev != word) {
            topRow.push(word);
          }
        }

        if (next.offsetTop != 0 && pos == word.childNodes.length - 1) {
          for (const el of topRow) {
            el.style.display = 'none';
          }
          topRow = [];
        }

        if (word.childNodes.length - 1 <= pos) {
          pos = 0;
          idx++;
          return;
        }
        pos++;
      }
    });
  }
  //   init();
}
