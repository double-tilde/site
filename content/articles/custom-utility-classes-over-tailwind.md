+++
date = '2025-11-09'
updated = '2025-11-09'
url = '/:section/:year-:month-:day-:contentbasename/'
draft = true
title = 'Custom Utility Classes Over Tailwind'
summary = 'Why did I choose to make my own utility classes for this site, rather than using Tailwind?'
layout =  "article"
tags = ['css', 'tailwind', 'opinion']
comments = true
+++

I decided to write my own CSS classes for this site, including smaller utility classes that many choose [Tailwind](https://tailwindcss.com/) for these days. I want to explore why I made this choice. Whilst I did think about using Tailwind when I first started this project, I decided to write all of the CSS myself, which has its own benefits and drawbacks.

## Using Less Dependencies

Currently, my `package.json` looks like [this.](https://github.com/double-tilde/site/blob/main/package.json) As you can see, there are not many dependencies here, and I think I prefer it that way. Recently I have been learning how to program in Go, which is a language with many features built in to the standard library, the philosophy of programmers who write Go code is to do what you can with the standard library first and reach for third party tools only when you have to. Those tools themselves often have less third party dependencies than projects in other languages. Hugo (the static site generator I used to create this website) is also written in Go. That's not to say Hugo has no third party dependencies, [it does](https://github.com/gohugoio/hugo/blob/master/go.mod), but as a project written in Go, I feel more confident that careful thought went into the third party tools that were included.

As someone with a lot of experience writing CSS, I didn't feel like including Tailwind was necessary to achieve what I wanted to achieve, it wouldn't save much time, and I know how to write CSS the way I like it, so opting to add a third party tool didn't make much sense here. It would be another tool I would have to decide when to update and make sure things didn't break when I did. Over all, my mentality around using third party tools has shifted since I started learning Go, hearing stories like [this](https://www.youtube.com/watch?v=OSNObKP-tB4) about NPM vulnerabilities made me realise that keeping the number of packages you use small is a stronger factor in security than I thought. Often, what seems like just one third party tool is a web of tools instead.

One could argue that Tailwind itself follows the Go philosophy, some of the traditional problems with CSS include:

- It is notoriously difficult to keep under control, files get unreasonably large quickly as developers tack on new classes to the end of a confusing web of files.
- There are many CSS naming conventions and directory structures designers and developers must learn, all with their own drawbacks. There is often no linting tool enforcing these rules so they tend to break down quickly.
- Other frameworks like Bootstrap or Material UI tend to have a certain look, so designers may feel boxed in to making a interface that feels stale.

Tailwind solves these problems in a simple and easy to use tool that doesn't result in your website looking like just another Tailwind site. I would agree with this argument. I bring up Go's philosophical influence on me purely in relation to opting against a dependency in this case when in the past I wouldn't have given it a second thought. If I had decided to use a CSS framework, it would be Tailwind, for how it tries to solve the core problems with CSS and doesn't go beyond that.

## Smaller Projects Benefit Less

A small website where I want to write articles and tutorials isn't the best candidate for Tailwind. Problems such as huge CSS files, confusing CSS specificity, and ugly naming conventions that arise as a project gets larger are unlikely to happen within a simple static site like this one. Like I mentioned in the introduction to this post, I have some CSS utility classes that I have written myself because there is no denying that they are useful for many simple CSS tasks like changing the display or adding some margin. I have a file called `utils.css` with all of my utility classes that I can add to if I find myself repeating small snippets of CSS or I can foresee wanting utility classes for a specific property.

This is my own personal project, if it was a larger, more complex app with many designers working on it, Tailwind starts to become an enticing option; there's great documentation, coherent class names, and many front end developers are familiar with it. But those are not problems I have to solve for here.

## Moving Between Utility Classes and Standard CSS

When I have used Tailwind in the past, I find I become too reliant on the utility class mindset. Since I have decided to use a third party tool, I want to use it for everything, even when that might not make sense. However, with my own utility classes I find a nice balance between using those classes and turning to standard CSS when it feels right, for example the code block styling below:

```css
.class {
	display: block;
}
```

This code block is styled in the [traditional way,](https://github.com/double-tilde/site/blob/main/assets/css/01-components/code-figure.css)while taking advantage of newer CSS features like nesting classes. It feels tidier to use a dedicated CSS file for complex styling that includes pseudo elements, media screen widths, and lots of properties. I could put this CSS in the Hugo component file for my code blocks, which I may end up doing in the future, but for now I have my CSS confined to the `assets/` folder with a minimal directory structure to keep it simple.

Of course, you can [achieve this](https://tailwindcss.com/docs/adding-custom-styles#adding-component-classes) sort of thing with Tailwind, and the docs make suggestions for dealing with [repeated classes](https://tailwindcss.com/docs/styling-with-utility-classes#managing-duplication), either with some of the built in features or by using modern editor techniques. For this site, it is more of a philosophical difference, not a difference in features. Using Tailwind does not mean you have to only use utility classes with no custom CSS, but I find myself thinking that way when I use it nonetheless.

## When Tailwind is the Right Choice

As I have already mentioned, I think Tailwind is the right choice when you are working on larger, more complex applications. During the 5 years that I have been a web developer, I have mainly focused on the UI, but I plan to work on side projects in other areas of development, I can easily see myself reaching for Tailwind when I work on these projects, especially where I want to focus on the back end logic. You can trust that Tailwind will help you focus where you need to in these cases.

I do still enjoy working on the design, this year I made a [theme for Obsidian,](https://github.com/double-tilde/old-world-obsidian) and I plan to work on other themes for applications I use a lot in the future too. But when design is not the main focus of a project, I can easily see the benefits of Tailwind to help you stay focused on the problems you are trying to solve.