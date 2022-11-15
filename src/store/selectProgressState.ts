import { selector } from "recoil";

import { progressFilterState } from "./recoil/progressFilterState";
import { todosListState } from "./recoil/todosListState";
import { filteredTodoListState } from "./recoil/filteredTodoListState";

export const selectProgressState = selector({
  key: "selectProgressState",
  get: ({ get }) => {
    const filter = get(progressFilterState);
    const list = get(todosListState);
    get(filteredTodoListState);

    switch (filter) {
      case "notStarted":
        return list.filter((item) => item.progress === "未着手🐑");
      case "inProgress":
        return list.filter((item) => item.progress === "着手❤️‍🔥");
      case "done":
        return list.filter((item) => item.progress === "完了💮");
      default:
        return list;
    }
  }
});
