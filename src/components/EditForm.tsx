import React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Flex
} from "@chakra-ui/react";
import { ProgressSelect } from "../atoms/ProgressSelect";

export const EditForm = (props) => {
  const {
    currentTodo,
    onEditFormSubmit,
    onEditInputChange,
    onEditSelectedInputChange,
    onEditDetailInputChange,
    setIsEditing
  } = props;

  return (
    <>
      <Flex
        bg="gray.50"
        rounded="lg"
        color="gray.400"
        align="center"
        justify="center"
      >
        <Box boxShadow="2xl" p="6" rounded="md" bg="white">
          <form className="edit-area" onSubmit={onEditFormSubmit}>
            <p>Edit TODO</p>
            <FormControl>
              <FormLabel htmlFor="updateTodo"></FormLabel>
              <Input
                mb={4}
                name="updateTodo"
                id="updateTodo"
                type="text"
                value={currentTodo.title}
                onChange={onEditInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="edit-select"></FormLabel>
              <ProgressSelect
                name="edit-select"
                id="edit-select"
                value={currentTodo.progress}
                onChange={onEditSelectedInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="update-detail"></FormLabel>
              <Textarea
                mt={4}
                mb={4}
                name="update-detail"
                id="update-detail"
                value={currentTodo.detail}
                onChange={onEditDetailInputChange}
              />
            </FormControl>
            <Button type="submit" onClick={onEditFormSubmit}>
              Update!!
            </Button>

            <Button
              type="submit"
              onChange={() => {
                setIsEditing(false);
              }}
            >
              Cancel
            </Button>
          </form>
        </Box>
      </Flex>
    </>
  );
};
