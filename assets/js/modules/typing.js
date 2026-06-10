const game = {
  playing: true,
  // TODO: change to 30
  countdown: 10,
  intervalID: 0,
  keypress: 0,
  correctPress: 0,
  incorrectPress: 0,
};

function stringToHTML(str) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(str, 'text/html');
  return doc.body.firstChild;
}

function startTimer() {
  if (game.playing) {
    game.intervalID = setInterval(() => {
      game.countdown = game.countdown - 1;
      console.log(game.countdown);
      if (game.countdown <= 0) {
        game.playing = false;
        clearInterval(game.intervalID);
        console.log('keypress', game.keypress);
        console.log('correct press', game.correctPress);
        console.log('incorrect press', game.incorrectPress);
      }
    }, 1000);
  }
}

function shuffleArrayInPlace(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function renderWords(wordsDiv, wordsArr) {
  for (const word of wordsArr) {
    const para = stringToHTML('<p>');
    wordsDiv.appendChild(para);

    for (const letter of word) {
      const span = stringToHTML(`<span>${letter}</span>`);
      para.appendChild(span);
    }

    const space = stringToHTML(`<span>&nbsp;</span>`);
    para.appendChild(space);
  }
}

function gameLoop(words, cursor) {
  let wordIdx = 0;
  let letterPos = 0;
  let topRowWords = [];

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

    if (game.playing) {
      cursor.classList.remove('cursor-throb');

      if (game.keypress == 0) {
        startTimer();
      }

      let word = words.childNodes[wordIdx];
      let letter = word.childNodes[letterPos];
      let letterWidth = letter.offsetWidth;
      let cursorPosition = parseInt(cursor.style.left, 10) || 0;

      if (event.key == 'Backspace') {
        if (letterPos == 0 && wordIdx > 0) {
          wordIdx--;
          word = words.childNodes[wordIdx];
          letterPos = word.childNodes.length - 1;
        } else if (letterPos > 0) {
          letterPos--;
        } else {
          letterPos = 0;
        }
        word = words.childNodes[wordIdx];
        letter = word.childNodes[letterPos];

        if (cursorPosition > 0) {
          cursor.style.left = cursorPosition - letterWidth + 'px';
        }
        letter.classList.remove('correct', 'incorrect');
        return;
      }

      const nextWord = words.childNodes[wordIdx + 1];
      const topRowWord = word.offsetTop == 0;
      const nextRowWord = nextWord.offsetTop != 0;
      const lastLetterLastWord =
        topRowWord && letterPos == word.childNodes.length - 1 && nextRowWord;

      if (lastLetterLastWord) {
        if (event.code == 'Space' && letterPos == word.childNodes.length - 1) {
          letter.classList.add('correct');
          cursor.style.left = '0px';
          game.correctPress++;
          game.keypress++;
        }
      } else if (
        event.key == letter.innerText ||
        (event.code == 'Space' && letterPos == word.childNodes.length - 1)
      ) {
        letter.classList.add('correct');
        cursor.style.left = cursorPosition + letterWidth + 'px';
        game.correctPress++;
        game.keypress++;
      } else {
        letter.classList.add('incorrect');
        cursor.style.left = cursorPosition + letterWidth + 'px';
        game.incorrectPress++;
        game.keypress++;
      }

      if (topRowWord) {
        let prev;
        if (topRowWords.length > 0) {
          prev = topRowWords.at(-1);
        }

        if (prev != word) {
          topRowWords.push(word);
        }
      }

      if (nextRowWord && letterPos == word.childNodes.length - 1) {
        for (const word of topRowWords) {
          word.style.display = 'none';
        }
        topRowWords = [];
      }

      if (word.childNodes.length - 1 <= letterPos) {
        letterPos = 0;
        wordIdx++;
      } else {
        letterPos++;
      }
    }
  });
}

export function typingGame() {
  const page = document.getElementById('typing');
  const wordsDiv = document.querySelector('.words');

  if (page != null && wordsDiv != null) {
    const cursor = document.getElementById('cursor');
    let wordsArr = [
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
      'cursor',
      'distributed',
      'static',
      'shortcut',
    ];

    wordsArr = shuffleArrayInPlace(wordsArr);
    renderWords(wordsDiv, wordsArr);

    gameLoop(wordsDiv, cursor);
  }
  //   init();
}
