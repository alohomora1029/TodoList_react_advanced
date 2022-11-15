import { useState, VFC, useEffect } from "react";
import "./styles.css";
import { Box, VStack } from "@chakra-ui/react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  query,
  where,
  orderBy
} from "firebase/firestore";

import db from "./firebase";
import { EditForm } from "./components/EditForm";
import { TodoForm } from "./components/TodoForm";
import { ProgressSelect } from "./atoms/ProgressSelect";
import { TodoTable } from "./components/TodoTable";
import { todosListState } from "./store/recoil/todosListState";
import { selectProgressState } from "./store/selectProgressState";
import { progressFilterState } from "./store/recoil/progressFilterState";

export const App: VFC = () => {
  const [todos, setTodos] = useRecoilState(todosListState);
  const [todo, setTodo] = useState({
    id: 0,
    title: "",
    progress: "",
    detail: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});
  const [isfilter, setIsFilter] = useState(false);

  const [filter, setFilter] = useRecoilState(progressFilterState);
  const FilteredTodoList = useRecoilValue(selectProgressState);

  //追加
  const handleAddInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const target = e.target;
    const value =
      target.name === "progress"
        ? target.selectedOptions[0].text
        : target.value;
    const name = target.name;
    setTodo((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddFrom = (e) => {
    e.preventDefault();
    if (todo !== "") {
      addDoc(collection(db, "todos"), {
        id: todos.length + 1,
        title: todo.title,
        progress: todo.progress,
        detail: todo.detail
      });

      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          title: todo.title,
          progress: todo.progress,
          detail: todo.detail
        }
      ]);
    }
    setTodo({ id: 0, title: "", progress: "", detail: "" });
    setFilter("");
  };

  //削除
  const handleDeleteClick = async (id) => {
    const q = query(collection(db, "todos"), where("id", "==", id));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((ids) => {
      const documentID = ids.id;
      deleteDoc(doc(db, "todos", documentID));

      const removeItem = todos.filter((todo) => {
        return todo.id !== id;
      });
      setTodos(removeItem);
    });
  };

  //編集
  function handleEditInputChange(e) {
    setCurrentTodo({
      ...currentTodo,
      title: e.target.value
    });
  }

  function handleEditSelectedInputChange(e) {
    setCurrentTodo({
      ...currentTodo,
      progress: e.target.selectedOptions[0].textContent
    });
  }

  function handleEditDetailInputChange(e) {
    setCurrentTodo({
      ...currentTodo,
      detail: e.target.value
    });
  }

  function handleEditClick(todo) {
    setIsEditing(true);
    setCurrentTodo({ ...todo });
  }

  function handleUpdateTodo(id, updatedTodo) {
    const updatedItem = todos.map((todo) => {
      return todo.id === id ? updatedTodo : todo;
    });
    setIsEditing(false);
    setTodos(updatedItem);
  }
  function handleEditFormSubmit(e) {
    e.preventDefault();
    handleUpdateTodo(currentTodo.id, currentTodo);
  }
  function handleSelectedProgress(e) {
    setIsFilter(true);
    setFilter(e.target.value);
  }
  //一覧表示
  useEffect(() => {
    const postData = query(collection(db, "todos"), orderBy("id", "asc"));

    getDocs(postData).then((snapShot) => {
      setTodos(snapShot.docs.map((doc) => ({ ...doc.data() })));
    });
  }, [setTodos]);

  return (
    <>
      <VStack>
        {isEditing ? (
          <EditForm
            currentTodo={currentTodo}
            onEditFormSubmit={handleEditFormSubmit}
            onEditInputChange={handleEditInputChange}
            onEditSelectedInputChange={handleEditSelectedInputChange}
            onEditDetailInputChange={handleEditDetailInputChange}
            setIsEditing={setIsEditing}
          />
        ) : (
          <TodoForm
            handleAddFrom={handleAddFrom}
            todo={todo}
            handleAddInputChange={handleAddInputChange}
          />
        )}
        <Box>
          <ProgressSelect
            id="filter"
            name="filter"
            value={filter}
            onChange={handleSelectedProgress}
          />
        </Box>
        {isfilter ? (
          <>
            {FilteredTodoList.map((todo) => (
              <TodoTable
                todos={todos}
                todo={todo}
                handleEditClick={handleEditClick}
                handleDeleteClick={handleDeleteClick}
              />
            ))}
          </>
        ) : (
          <>
            <TodoTable
              todos={todos}
              todo={todo}
              handleEditClick={handleEditClick}
              handleDeleteClick={handleDeleteClick}
            />
          </>
        )}
      </VStack>
    </>
  );
};
