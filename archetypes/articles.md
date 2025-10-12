+++
date = '{{ time.Now.Format "2006-01-02" }}'
draft = true
title = '{{ replace .File.ContentBaseName "-" " " | title }}'
summary = ''
layout =  "article"
tags = ['tag']
comments = true
+++
