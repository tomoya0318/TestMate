This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started
以下のコマンドを順に実行(docker使用)
```
make build
```
```
make up
```

Open [http://localhost:3010](http://localhost:3010) with your browser to see the result.

## 各ファイルの役割
```
.  
├── prisma: DB作成用
├── public: 静的画像保管用
└── src/
    ├── aciton: server action用の関数
    ├── api: apiを叩くためのfetch関数
    ├── app: ページ部分
    ├── components: 全体的なコンポーネント
    ├── libs: ライブラリ用
    └── types: typescriptの型宣言用
```

## データベース
### テーブル構成
- `tables`
  - `User`：ユーザテーブル
    - `id`：ID
    - `name`：名前
    - `email`：Emailアドレス
    - `emailVerified`：Emailの認証確認
    - `introduce`：自己紹介文
    - `image`：画像ファイルのパス
  - `Account`：ユーザーのアカウント情報
    - `id`：ID
    - `userId`：アカウントのユーザID
    - `type`：アカウントの種類
    - `refresh_token`：リフレッシュトークン
    - `access_token`：アクセストークン
    - `expired_at`：有効期限
    - `token_type`：トークンの種類
    - `scope`：アクセストークンのスコープ
    - `id_token`：IDトークン
    - `session_state`：セッションの状態
  - `Session`
    - `id`：ID
    - `userId`：現在セッションしているユーザID
    - `sessionToken`：セッショントークン
    - `expires`：有効期限
  - `Post`
    - `id`：ID
    - `userId`：投稿ユーザのID
    - `title`：タイトル
    - `description`：説明
    - `date`：投稿日
  - `Like`
    - `userId`:押した人のユーザID
    - `postId`:押したpostのID
    - `createdAt`：お気に入りした時間
  - `Tags`
    - `id`：ID
    - `name`：タグの名前
  - `PostTags`
    - `postId`：タグがつけられた postのID
    - `tagId`：タグに付けられているID