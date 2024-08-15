-- CreateTable
CREATE TABLE "testers" (
    "id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "testers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "testers_post_id_idx" ON "testers"("post_id");

-- CreateIndex
CREATE INDEX "testers_user_id_idx" ON "testers"("user_id");

-- AddForeignKey
ALTER TABLE "testers" ADD CONSTRAINT "testers_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "testers" ADD CONSTRAINT "testers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
