import { PrismaClient } from "@prisma/client";
import { users } from "./seeds/users";
import { accounts } from "./seeds/accounts";
import { posts } from "./seeds/posts";
import { sessions } from "./seeds/session";
import { tags } from "./seeds/tags";
import { poststags } from "./seeds/posts_tags";


const prisma = new PrismaClient();

async function main() {
  // Userデータの挿入
  for (const user of users) {
    await prisma.user.create({ data: user });
  }
  // Postデータの挿入
  for (const post of posts) {
    await prisma.post.create({ data: post });
  }
  // Accountデータの挿入
  for (const account of accounts) {
    await prisma.account.create({ data: account });
  }
  //Sessionデータの挿入
  for (const session of sessions) {
    await prisma.session.create({ data: session });
  }
  //Tagデータの挿入
  for (const tag of tags) {
    await prisma.tag.create({ data: tag });
  }
  //PostTagデータの挿入
  for (const posttag of poststags) {
    await prisma.postTag.create({data: posttag});
  }
}

main()
  .then(() => {
    console.log('Seed data successfully added.');
  })
  .catch((error) => {
    console.error('Error seeding data:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });