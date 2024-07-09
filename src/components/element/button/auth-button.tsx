import React from "react";
import { signOutAction } from "@/action/sign-out";
import { signInAction } from "@/action/sign-in";
import { Button } from "@chakra-ui/react";

export const SignIn: React.FC = () => {
  return (
    <form action={signInAction}>
      <Button type="submit">サインイン</Button>
    </form>
  );
};

export const SignOut: React.FC = () => {
  return (
    <form action={signOutAction}>
      <Button type="submit">サインアウト</Button>
    </form>
  );
};
