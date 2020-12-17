/** @format */

import { atom } from "recoil";

export const UsersState = atom({
  key: "users",
  default: {},
});

export const ErrorState = atom({
  key: "error",
  default: {},
});
