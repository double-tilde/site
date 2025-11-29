+++
url = '/:section/note-:contentbasename/'
date = '2025-10-26'
updated = '2025-10-26'
title = 'Display Block'
prefix = 'CSS'
layout =  'note'
+++

## Example

<section class="code-example">
  <style>
    .code-example {
      display: block;
    }
    .code-example .square {
      height: 100px;
      width: 100px;
      text-align: center;
      background-color: var(--primary-clr);
      transition: 200ms all ease;
    }
    .code-example .square span {
      display: block;
      text-align: center;
      vertical-align: middle;
      line-height: 100px;
      color: var(--black-clr);
    }
    .code-example .square:hover {
      background-color: var(--secondary-clr);
      cursor: pointer;
    }
  </style>

  <div class="square inline-block mr-4 mb-4"><span>Click me!</span></div>
  <div class="square inline-block"><span>Click me!</span></div>
  <p class="mb-0">An example of a p tag taking up full width</p>

  <script type="text/javascript">
    squares = document.querySelectorAll(".code-example .square");
    squares.forEach((square) => {
      square.addEventListener("click", function() {
        square.style.display = "none";
      });
    });
  </script>
</section>

### Code

```html
<section class="code-example">
  <style>
    .code-example {
      display: block;
    }
    .code-example .square {
      height: 100px;
      width: 100px;
      text-align: center;
      background-color: var(--primary-clr);
      transition: 200ms all ease;
    }
    .code-example .square span {
      display: block;
      text-align: center;
      vertical-align: middle;
      line-height: 100px;
      color: var(--black-clr);
    }
    .code-example .square:hover {
      background-color: var(--secondary-clr);
      cursor: pointer;
    }
  </style>

  <div class="square inline-block mr-4 mb-4"><span>Click me!</span></div>
  <div class="square inline-block"><span>Click me!</span></div>
  <p class="mb-0">An example of a p tag taking up full width</p>

  <script type="text/javascript">
    squares = document.querySelectorAll(".code-example .square");
    squares.forEach((square) => {
      square.addEventListener("click", function() {
        square.style.display = "none";
      });
    });
  </script>
</section>
```

### Notes

- Display block to display none affects the other elemenets on the page (unless it has been positioned outside of the document flow with absolute positioning or similar). You can see this with how the other block moves when the first block is clicked. The same applies to inline-block.
- The transition property has no effect on the display property. Even though the transition is set to apply to "all", it does not apply to display.
- By default, display block always takes up the full width of the available space (the width of the contianer that is setting the width), you can see this by inspecting the paragraph element. This would only change when an element is a child of a flex or grid parent, where some of its display properties are controlled by the parent element.
