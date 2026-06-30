export const game = {
  playing: false,
  countdown: null,
  intervalID: null,
  keypress: null,
  correctPress: null,
  incorrectPress: null,

  gameLength: null,
  cursor: null,
  timer: null,
  timerUnits: null,
  words: null,
  endDisplay: null,


  init: function () {
    this.playing = true;
    // TODO: change to 30
    this.countdown = 10;
    this.intervalID = 0;
    this.keypress = 0;
    this.correctPress = 0;
    this.incorrectPress = 0;

    this.cursor = document.getElementById('cursor');
    this.timer = document.getElementById('timer');
    this.timerUnits = document.getElementById('timer-units');
    this.words = [
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
      'slice',
      'macro',
      'boilerplate',
      'art',
      'markdown',
      'lazy',
      'config',
      'deploy',
    ];

    this.gameLength = this.countdown;
    this.timer.innerText = this.countdown;
    this.timerUnits.innerText = 'seconds';

    this.endDisplay = document.getElementById('end-display');
  },

  startTimer: function () {
    if (this.playing) {
      this.intervalID = setInterval(() => {
        this.countdown = this.countdown - 1;
        this.timer.innerText = this.countdown;

        if (this.countdown == 1) {
          this.timerUnits.innerText = 'second';
        }

        if (this.countdown <= 0) {
          clearInterval(this.intervalID);
          this.timerUnits.innerText = 'seconds';
          this.playing = false;
          this.end();
        }
      }, 1000);
    }
  },

  shuffleWords: function () {
    for (let i = this.words.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.words[i], this.words[j]] = [this.words[j], this.words[i]];
    }
  },

  renderWords: function (wordsDiv) {
    for (const word of this.words) {
      const para = stringToHTML('<p>');
      wordsDiv.appendChild(para);

      for (const letter of word) {
        const span = stringToHTML(`<span>${letter}</span>`);
        para.appendChild(span);
      }

      const space = stringToHTML(`<span>&nbsp;</span>`);
      para.appendChild(space);
    }

    this.words = wordsDiv;
  },

  loop: function () {
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

      if (this.playing) {
        this.cursor.classList.remove('cursor-throb');

        if (this.keypress == 0) {
          this.startTimer();
        }

        let word = this.words.childNodes[wordIdx];
        let letter = word.childNodes[letterPos];
        let letterWidth = letter.offsetWidth;
        let cursorPosition = parseInt(this.cursor.style.left, 10) || 0;

        if (event.key == 'Backspace') {
          if (letterPos == 0 && wordIdx > 0) {
            wordIdx--;
            word = this.words.childNodes[wordIdx];
            letterPos = word.childNodes.length - 1;
          } else if (letterPos > 0) {
            letterPos--;
          } else {
            letterPos = 0;
          }
          word = this.words.childNodes[wordIdx];
          letter = word.childNodes[letterPos];

          if (cursorPosition > 0) {
            this.cursor.style.left = cursorPosition - letterWidth + 'px';
          }
          letter.classList.remove('correct', 'incorrect');
          return;
        }

        const nextWord = this.words.childNodes[wordIdx + 1];
        const topRowWord = word.offsetTop == 0;
        const nextRowWord = nextWord.offsetTop != 0;
        const lastLetterLastWord =
          topRowWord && letterPos == word.childNodes.length - 1 && nextRowWord;

        if (lastLetterLastWord) {
          if (
            event.code == 'Space' &&
            letterPos == word.childNodes.length - 1
          ) {
            letter.classList.add('correct');
            this.cursor.style.left = '0px';
            this.correctPress++;
            this.keypress++;
          }
        } else if (
          event.key == letter.innerText ||
          (event.code == 'Space' && letterPos == word.childNodes.length - 1)
        ) {
          letter.classList.add('correct');
          this.cursor.style.left = cursorPosition + letterWidth + 'px';
          this.correctPress++;
          this.keypress++;
        } else {
          letter.classList.add('incorrect');
          this.cursor.style.left = cursorPosition + letterWidth + 'px';
          this.incorrectPress++;
          this.keypress++;
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
  },

  end: function () {
    this.cursor.style.display = 'none';
    const wordsChildren = document.querySelectorAll('.words > *');

    this.endDisplay.classList.add('end');
    for (const child of wordsChildren) {
      child.classList.add('end');
    }

    let correctPercent = calculatePercent(this.keypress, this.correctPress);
    let wpm = calculateWPM(this.gameLength, this.correctPress);

    this.endDisplay.appendChild(
      stringToHTML(
        `<div class="flex items-center justify-center g-4"><span>Accuracy: <span>${correctPercent}%</span></span><span>|</span><span>WPM: <span>${wpm}</span></span></div>`,
      ),
    );
    this.endDisplay.appendChild(
      stringToHTML(
        `<button class="button secondary" id="reset">reset</button>`,
      ),
    );

    const reset = document.getElementById('reset');
    reset.addEventListener('click', () => {
      this.reset();
    });
  },

  reset: function () {
    const wordsChildren = document.querySelectorAll('.words > *');
    this.endDisplay.classList.remove('end');
    for (const child of wordsChildren) {
      child.classList.remove('end');
    }

    this.cursor.classList.add('cursor-throb');
    this.cursor.style.left = '0px';
    this.cursor.style.display = 'block';
    typingGame();
  },
};

export function typingGame() {
  const page = document.getElementById('typing');
  const wordsDiv = document.querySelector('.words');

  if (page != null && wordsDiv != null) {
    wordsDiv.innerHTML = '';

    game.init();
    game.shuffleWords();
    game.renderWords(wordsDiv);
    game.loop();
  }
}

function stringToHTML(str) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(str, 'text/html');
  return doc.body.firstChild;
}

function calculatePercent(whole, part) {
  if (whole == 0 || part == 0) {
    return 0;
  }

  let percent = (part / whole) * 100;
  percent = Math.round(percent * 100) / 100;
  return percent;
}

function calculateWPM(gameLength, keypresses) {
  if (gameLength == 0 || keypresses == 0) {
    return 0;
  }

  let averageWordLength = 5;
  let minuteInSeconds = 60;
  let result =
    (keypresses / averageWordLength) * (minuteInSeconds / gameLength);
  result = Math.round(result);
  return result;
}
