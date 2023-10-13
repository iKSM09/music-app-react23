import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export type UserTypes = {
  uid: string;
  displayName: string;
  email: string;
};

export const authDialogAtom = atom(false);
export const userAtom = atomWithStorage<UserTypes | null>("user", null);
