"use server";
import { signOut } from "@/libs/auth";
export const signOutAction = async () =>{
  await signOut();
};