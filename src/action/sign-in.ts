"use server";
import { signIn } from "@/libs/auth";
  
export const signInAction = async () =>{
  await signIn();
};