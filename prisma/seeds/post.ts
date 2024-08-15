import {Post} from "@prisma/client";

export const posts: Omit<Post, 'id'>[] = [
  {
    title: "エクスプロラーズ",
    short: "街歩きリアル探索ゲーム",
    description: "エクスプロラーズの詳しい説明",
    iconUrl: "/seed_app.png",
    screenshots: ["/seed_screenshot.png", "/seed_screenshot.png", "/seed_screenshot.png"],
    groupUrl: "https://example.com/group1",
    storeUrl: "https://example.com/store1",
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: "user1",
  },
];