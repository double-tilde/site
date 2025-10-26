+++
url = '/:section/code-example-:contentbasename/'
date = '{{ time.Now.Format "2006-01-02" }}'
updated = '{{ time.Now.Format "2006-01-02" }}'
title = '{{ replace .File.ContentBaseName "-" " " | title }}'
prefix = "CSS"
layout =  "example"
+++

## Example

<section class="code-example">
  <style>
    .code-example {
      display: block;
    }
    .code-example .container {
        display: block;
        height: 100px;
        width: 100px;
        background-color: var(--primary-clr);
    }
  </style>

  <div class="flex flex-wrap g-4">
    <div class="container"></div>
    <div class="container"></div>
  </div>

  <script type="text/javascript">
    container = document.querySelector(".code-example .container");
    container.addEventListener("click", function (event) {
      window.alert("hello");
    });
  </script>
</section>

### Code

```html
<section class="code-example">
  <style>
    .code-example {
      display: block;
      margin-bottom: var(--root-8);
    }
    .code-example .container {
      display: block;
      height: 100px;
      width: 100px;
      background-color: var(--primary-clr);
    }
  </style>

  <div class="flex flex-wrap g-4">
    <div class="container"></div>
    <div class="container"></div>
  </div>

  <script type="text/javascript">
    container = document.querySelector('.code-example .container');
    container.addEventListener('click', function (event) {
      window.alert('hello');
    });
  </script>
</section>
```

### Notes

- notes go here
- another note
- one final note

