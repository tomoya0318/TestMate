import { Session } from "@prisma/client";

export const sessions: Omit<Session, 'id'>[] = [
  {
    userId: "user1",
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day later
    sessionToken: "session-token-1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
