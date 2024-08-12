## Getting Started
以下のコマンドを順に実行(yarn v4を使用します)

1. 開発環境のインストール
```
yarn install
```

2. 開発環境の立ち上げ
```
yarn dev
```

開発環境は[http://localhost:3010](http://localhost:3010)にて確認できます


## コミット時のルール
Prefixをつけましょう.[参考](https://arc.net/l/quote/zdnbwhew)

- feat: 新しい機能
- fix: バグの修正
- docs: ドキュメントのみの変更
- style: 空白、フォーマット、セミコロン追加など
- refactor: 仕様に影響がないコード改善(リファクタ)
- perf: パフォーマンス向上関連
- test: テスト関連
- chore: ビルド、補助ツール、ライブラリ関連


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