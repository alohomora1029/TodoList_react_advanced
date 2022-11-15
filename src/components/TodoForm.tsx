import React from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button
} from "@chakra-ui/react";
import { ProgressSelect } from "../atoms/ProgressSelect";

export const TodoForm = (props) => {
  const { handleAddFrom, todo, handleAddInputChange } = props;

  return (
    <>
      <Flex
        rounded="lg"
        color="gray.400"
        align="center"
        justify="center"
        height="100vh"
      >
        <Box boxShadow="2xl" p="6" rounded="md" bg="white">
          <form className="input-area" onSubmit={handleAddFrom}>
            <p>1st.TODOリスト</p>
            <FormControl>
              <FormLabel htmlFor="title"></FormLabel>
              <Input
                mb={4}
                name="title"
                id="title"
                type="text"
                placeholder="タイトル"
                value={todo.title}
                onChange={handleAddInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="progress"></FormLabel>
              <ProgressSelect
                name="progress"
                id="progress"
                value={todo.progress}
                onChange={handleAddInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="detail"></FormLabel>
              <Textarea
                mt={4}
                mb={4}
                name="detail"
                id="detail"
                value={todo.detail}
                onChange={handleAddInputChange}
              />
            </FormControl>
            <Button type="submit">追加</Button>
          </form>
        </Box>
      </Flex>
    </>
  );
};
