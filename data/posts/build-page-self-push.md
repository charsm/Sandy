---
title: "Github 构建发布到私有服务器"
pubDate: 2024-05-11
description: "blog action"
menu: "note"
isComment: false
---

记录配置 github action 自动构建发布到私有服务器

```yml
name: build and auto publish github pages
on:
  push:
    branches:
      - master
jobs:
  blog_build:
    runs-on: ubuntu-latest
    env:
      NEXT_PUBLIC_ALGOLIA_INDEX_NAME: com.cyatime.blog
      NEXT_PUBLIC_ALGOLIA_APP_ID: ${{ secrets.ALGOLIA_APP_ID }}
      NEXT_PUBLIC_ALGOLIA_ADMIN_KEY: ${{ secrets.ALGOLIA_ADMIN_KEY }}
      NEXT_PUBLIC_ALGOLIA_SEARCH_KEY: ${{ secrets.ALGOLIA_SEARCH_KEY }}
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "16.x"
      - name: generate out file
        run: |
          sh ./build.sh
      - name: deploy file
        uses: wlixcc/SFTP-Deploy-Action@v1.2.4
        with:
          username: ${{ secrets.SFTP_USERNAME }}
          server: ${{ secrets.SFTP_HOSTNAME }}
          password: ${{ secrets.SFTP_PWD }}
          port: ${{ secrets.SFTP_PORT }}
          local_path: "blog.tar.gz"
          remote_path: "/home/dstation"
          sftpArgs: "-o ConnectTimeout=5"
      - name: executing remote ssh commands using password
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SFTP_HOSTNAME }}
          username: ${{ secrets.SFTP_USERNAME }}
          password: ${{ secrets.SFTP_PWD }}
          port: ${{ secrets.SFTP_PORT }}
          script: |
            cd /home/dstation/blog
            rm -rf /home/dstation/blog/*
            cd /home/dstation
            mv ./blog.tar.gz ./blog/
            cd ./blog
            tar -zxvf blog.tar.gz
            pm2 reload blog
```
