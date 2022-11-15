import { atom } from "recoil";

export const filteredTodoListState = atom({
  key: "filteredTodoListState",
  default: []
});
