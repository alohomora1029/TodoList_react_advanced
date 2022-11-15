import { memo, VFC } from "react";
import { Select } from "@chakra-ui/react";

type Props = {
  id: string;
  name: string;
  value: any;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const ProgressSelect: VFC<Props> = memo((props) => {
  const { name, id, value, onChange } = props;
  return (
    <>
      <Select name={name} id={id} value={value} onChange={onChange}>
        <option value="" selected disabled></option>
        <option value="notStarted">未着手🐑</option>
        <option value="inProgress">着手❤️‍🔥</option>
        <option value="done">完了💮</option>
      </Select>
    </>
  );
});
