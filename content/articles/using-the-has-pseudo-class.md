+++
date = '2025-11-12'
updated = '2025-11-29'
url = '/:section/:year-:month-:day-:contentbasename/'
draft = false
title = 'Using the Has Pseudo Class'
summary = 'How the "has" selector in CSS can keep your code clean'
layout =  "article"
tags = ['css', 'tutorial']
comments = true
+++

The `:has` pseudo class is a great addition to CSS and can make your code cleaner, it's been available [for a few years](https://caniuse.com/css-has) and I have used it in the style-sheets for this site. One of the issues with CSS is based in its declarative nature, it lacks features you find in general purpose programming languages like conditionals and loops. This has been changing recently, the `:has` class can act like an if statement, which unlocks a lot of possibilities.

>***Tip*** a declarative programming language describes the desired outcome, rather than specifying the steps to reach that outcome. In CSS, you do not have to describe the steps to find when a selector is the `first-child`, you instead state `.class:first-child` and CSS does the work for you.

## Usage

The main way to use `:has` is as a conditional statement. Take a look at the following example:

```css
label {
	display: block;
}

label:has(+ input[required])::after {
	content: '*';
	color: red;
}
```

This code uses the `:has` selector to state that: *if the label element has a direct sibling that is an input element, and if that input has the "required" attribute, add a pseudo-element to the label and apply the properties stated.* This is really useful for styling elements in specific conditions. In the past, you would do something like this:

```css
label {
	display: block;
}

label.required::after {
	content: '*';
	color: red;
}
```

The above example looks simpler on the surface, in reality the conditional logic has just been taken away from the CSS and moved somewhere else, likely into a JavaScript file that adds the `.required` class to the label if the input sibling has the "required" attribute. There is nothing wrong with this approach, but the `:has` class has a few benefits:

- For conditions that are only added to change simple CSS properties like this, it is less work to use the pseudo class than it is to create a JavaScript file, select the correct elements and add a class just to reach the same outcome (you could manually add the class in to your mark up but then you must remember to do the same if it is ever updated).
- You can extend it quickly, if you need to not only select input elements, but text areas and check boxes too, this approach now needs just a few lines of extra CSS.
- It's intuitive, many beginners find CSS approachable, this way of adding some simple logic to CSS builds on their understanding of parent, child, and sibling selectors, rather than reaching for a different language to achieve the same thing.

## More Logic

The `:has` selector can be used to perform *or* and *and* logic.

```css
/* or */
header:has(img, nav) {
	padding: 1rem 2rem;
}

/* and */
header:has(img):has(nav) {
	justify-content: space-between;
}
```

In the above example, we are using the `:has` selector to do a few things, with the *or* condition, we only want padding to apply when the header has at least one of the elements, either a logo or a navigation, or both. This could be useful if you were building a template and do not want the header to have any height unless it has these child elements.

We can also change the flex positioning of the items depending on what is within the header, if both the logo and the navigation are present, we space these elements to the left and right with `space-between`. But what if we only have one element present?

```css
/* exclusive or */
header:has(img):not(:has(nav)),
header:has(nav):not(:has(img)) {
    justify-content: center;
}
```

In this example, we are using `:has` and `:not` to create an *exclusive or* condition, where the header can only have either a logo or navigation, not both. The selector says *if the header has an img tag and does not have a nav tag, or if the header has a nav tag and does not have an img, apply the styles.*

>***Source*** The [MDN docs](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:has) go into great detail about this selector.

## Tips

Remember when using the `:has` pseudo class, you are applying styles to the selector with `:has` attached to it, not the selectors inside the brackets following `:has`. In the [earlier example](#usage) the `::after` element is being applied to the label, not the input.

Whenever you are trying to add styling to an element in specific conditions, see if you can use the `:has` class or other pseudo selectors instead of JavaScript. It can help you add less classes to your code and avoid specificity issues, keeping the code simple and more maintainable.

Only use `:has` when you know there is a conditional situation related to the styling, do not overuse it or use it preemptively. For example, if you have a side menu to house all of your links, do not add styling to the aside like this: `.aside:has(li)` unless you know there will be times where the menu is empty that must look different.

### Alternatives

It's still worth using the conditional rendering available in JavaScript and frameworks most of the time. There are occasions for layout purposes you need to render an empty container, such as creating flex or grid layouts. Whether to handle the rendering with `:has` or with a framework's conditional syntax is a choice you have to make for each instance. On this site, I only render the side menu when there are links, I do not use `:has` here are it serves no layout purpose to have the empty `aside` container, so it keeps the rendered markup cleaner to only show the menu when it has links within it.

```hugo
{{ if strings.Contains .TableOfContents "li" }}
    <aside>
        {{ .TableOfContents }}
    </aside>
{{ end }}
```