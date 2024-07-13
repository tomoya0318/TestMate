FROM node:18.17.0-alpine

WORKDIR /works

# 必要なファイルをビルドコンテキストからコピー
COPY package.json yarn.lock .yarnrc.yml ./

# Corepackを有効にしてYarnのバージョンを設定
RUN corepack enable
RUN yarn set version 4.3.1

# 依存関係をインストール
RUN yarn install

# アプリケーションのソースコードをコピー
COPY src ./src

# アプリケーションを開発モードで起動
CMD ["yarn", "dev"]
