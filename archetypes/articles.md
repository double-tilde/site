+++
date = '{{ time.Now.Format "2006-01-02" }}'
updated = '{{ time.Now.Format "2006-01-02" }}'
url = '/:section/:year-:month-:day-:contentbasename/'
draft = true
title = '{{ replace .File.ContentBaseName "-" " " | title }}'
summary = ''
layout =  'article'
tags = ['tag']
comments = true
image_src = '/images/image.jpg'
image_alt = '[Title], via Wikimedia Commons (Public Domain)'
image_link = 'https://en.wikipedia.org/wiki/The_School_of_Athens'
image_contain = false
+++
