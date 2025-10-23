+++
date = '{{ time.Now.Format "2006-01-02" }}'
updated = '{{ time.Now.Format "2006-01-02" }}'
url = '/:section/:year-:month-:day-:contentbasename/'
draft = true
title = '{{ replace .File.ContentBaseName "-" " " | title }}'
summary = ''
layout =  "article"
tags = ['tag']
comments = true
+++
