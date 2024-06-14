import { ChangeEventHandler } from "react";

type Props = {
  type: string;
  name: string;
  placeholder: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
  hasError: boolean;
  className?: string;
};

function InputField(props: Props) {
  return (
    <input
      type={props.type}
      name={props.name}
      placeholder={props.placeholder}
      onChange={props.onChange}
      value={props.value}
      className={
        "border-gray mt-6 block w-full rounded border border-solid p-2 " +
        props.className +
        (props.hasError
          ? " border-error-red focus:outline-error-red focus:outline focus:outline-1"
          : " border-gray-400")
      }
    />
  );
}

export default InputField;
