import { Account } from "@prisma/client";

export const accounts: Omit<Account, 'id'>[] = [
  {
    userId: "user1",
    type: "oauth",
    provider: "google",
    providerAccountId: "google-account-id-1",
    refresh_token: "refresh-token-1",
    access_token: "access-token-1",
    expires_at: 1723698010,
    token_type: "Bearer",
    scope: "profile email",
    id_token: "id-token-1",
    session_state: null,
  },
];