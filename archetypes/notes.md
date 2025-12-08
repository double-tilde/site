+++
url = '/:section/note-:contentbasename/'
date = '{{ time.Now.Format "2006-01-02" }}'
updated = '{{ time.Now.Format "2006-01-02" }}'
title = '{{ replace .File.ContentBaseName "-" " " | title }}'
layout =  'note'
+++

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

  <div class="square inline-block"><span>Click me!</span></div>

  <script type="text/javascript">
    square = document.querySelector(".code-example .square");
    square.addEventListener("click", function() {
      square.style.display = "none";
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

  <div class="square inline-block"><span>Click me!</span></div>

  <script type="text/javascript">
    square = document.querySelector(".code-example .square");
    square.addEventListener("click", function() {
      square.style.display = "none";
    });
  </script>
</section>
```

### Notes

- notes go here
- another note
- one final note

