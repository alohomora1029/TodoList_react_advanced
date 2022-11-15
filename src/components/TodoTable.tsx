import { memo, VFC } from "react";
import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button
} from "@chakra-ui/react";

type TodoType = {
  id: number;
  title: string;
  progress: string;
  detail: string;
};

type Props = {
  todos: TodoType[]; //todosはtodoを要素に持つ配列型なのでこのように指定できる
  todo: TodoType; // todoの型指定
  handleEditClick: (todo: TodoType) => void;
  handleDeleteClick: (todoId: TodoType["id"]) => void;
};

export const TodoTable: VFC<Props> = memo((props) => {
  const { todos, todo, handleEditClick, handleDeleteClick } = props;

  return (
    <>
      <li key={todo.id}>
        <TableContainer width="auto">
          <Table variant="simple">
            <TableCaption>TodoList</TableCaption>
            <Thead>
              <Tr>
                <Th>id</Th>
                <Th>title</Th>
                <Th>progress</Th>
                <Th>detail</Th>
              </Tr>
            </Thead>
            <Tbody>
              {todos.map((todo) => {
                return (
                  <Tr>
                    <Td>{todo.id}</Td>
                    <Td>{todo.title}</Td>
                    <Td>{todo.progress}</Td>
                    <Td>{todo.detail}</Td>

                    <Button onClick={() => handleEditClick(todo)}>編集</Button>
                    <Button
                      onClick={() => {
                        handleDeleteClick(todo.id);
                      }}
                    >
                      削除
                    </Button>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </li>
    </>
  );
});
