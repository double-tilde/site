+++
date = '2025-10-01'
updated = '2025-10-01'
url = '/:section/:year-:month-:day-:contentbasename/'
draft = false
title = 'Write Your Static Site Blog with Obsidian'
summary = 'When I decided to create this website, I knew I wanted to use a static site generator, I decided to use Hugo, but I wanted to be able to write the content inside Obsidian and not my code editor.'
layout =  'article'
tags = ['hugo', 'obsidian', 'tutorial']
comments = true
+++

For over a year, I have used the markdown text editor [Obsidian](https://obsidian.md/) to take notes on programming, philosophy, and music. I love being able to take notes in a simple text format that is understood by many applications and can go with me if I ever stop using Obsidian in the future. When I decided to create this website, I knew I wanted to use a static site generator, I decided to use [Hugo](https://gohugo.io/), but I wanted to be able to write the content inside Obsidian and not my code editor.

## The Problem

Obsidian has a "vault" which is just the directory Obsidian looks at to find the markdown files that make up your notes. My vault lives in `~/docs/braintwo/` - "braintwo" is the name of my vault. My website lives in my projects directory at `~/projects/double-tilde-site`. As you can see, this directory is completely unrelated to my vault directory. Obsidian lets you have multiple vaults, which can be useful if you have one for work and one for university, it lets you keep these things separate. However, I don't want to use multiple vaults in this case, I want as little friction as possible between having an idea for an article and writing that article.

## The Solution: Symlinks

Luckily the solution is simple: symbolic links. On Linux, a symbolic link or symlink is just a file that points to a different file or directory on your computer. If you are using Linux or MacOS, you can practise using symlinks like this:

- Open a terminal and go to your home directory using the command `cd ~`
- Make a directory using the command `mkdir temp-dir`
- Create a file inside the directory using `touch temp-dir-alt/file`
- Create a symlink with the following command `ln -s ~/temp-dir ~/sym-dir`

If you now check the contents of the `sym-dir/` directory, you will see it has the same file as the `temp-dir/` directory (you can check this in the terminal by using the command `ls` followed by the directory you want to list the contents of, for example `ls sym-dir`). You can safely delete or rename `sym-dir/` and no contents in the original directory will be moved, deleted or changed in any way.

### The Symlink Command

Above we used the command `ln -s` to create a symlink, also known as a soft link. This command tells the terminal to use the `ln` program which allows us to make all kinds of links. We use the `-s` flag which tells the `ln` command to make a soft link, not a hard link. We need to use a soft link in this case because we will be linking directories and hard links do not allow directory linking. There are other differences between hard and soft links, such as implications of deleting links and what affect that has on deleting data ([read more here](https://www.geeksforgeeks.org/operating-systems/difference-between-hard-link-and-soft-link/)), but for the purposes of using them with Obsidian in this way, we need directory linking, therefore we need soft links.

## Applying Symlinks to Obsidian

All we need to do now is use the symlink command to link the contents folder in our static site project to the correct folder inside Obsidian. The command takes the following structure:

```shell
ln -s <folder-to-link-to> <folder-where-link-will-live>
```

So, in my case the command looks like this:

```shell
ln -s ~/projects/double-tilde-site/content/ ~/docs/braintwo/30\ -\ Notes
```

> ***Note*** The backslashes (also know as an escape character) in the above code lets your shell/terminal know that the following space is a part of the directory path. My notes directory is called "30 - Notes" so in the terminal it is represented as `30\ -\ Notes`. This stops the command from being misinterpreted and makes sure the entire directory path is read by the command. 

This will create a folder inside Obsidian called "content".

![My hugo content folder in my obsdian vault](/images/2025-10-01-obsidian-symlink.png "My hugo content folder in my obsdian vault")

Feel free to rename this folder, I renamed mine to "Website". If you look inside that folder, you should see the structure of your markdown files from your static site. Now you have the comfort of all of your Obsidian plugins and familiar interface for writing your articles. Any changes you make to the files through Obsidian you will see reflected in your code editor or in the browser whilst serving the site locally.

Obviously this set up works best for personal blogs and websites. You would probably want to look into setting up a [headless CMS](https://jamstack.org/headless-cms/) if you were making a static site for a client and need a more cohesive set up. But using a symlink here is quick and simple and doesn't over-engineer the solution, instead we are relying on tools all computers have. [Windows has symbolic links](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/mklink) too, however the syntax is different to the syntax used on Linux and MacOS.

### Obsidian Sync

Obsidian Sync follows symlinks and backs these files up to the Obsidian servers, so you can use symlinks and still access these files on your phone or other devices.

![The article on my phone](/images/2025-10-01-obsidian-mobile-250.jpg "The article on my phone")

### Using Symlinks Elsewhere

The next thing I am going to do is use symlinks for the images folder so I can see the images in Obsidian that belong to my website too. It's the same process again, but if you do not want the images to be synced by Obsidian (especially if you have a lot of them), you can turn off sync for certain file types or for specific directories. This is achieved in the sync tab, under "selective sync". If you use GitHub for backup instead of Obsidian Sync, you can use the `.gitignore` file to not sync certain folders or files.
