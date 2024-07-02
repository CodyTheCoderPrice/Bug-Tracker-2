import { ChangeEventHandler } from "react";

type TProps = {
  type: string;
  name: string;
  placeholder: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  autoComplete?: string;
  value: string;
  hasError: boolean;
  className?: string;
};

function InputField(props: TProps) {
  return (
    <input
      type={props.type}
      name={props.name}
      placeholder={props.placeholder}
      onChange={props.onChange}
      autoComplete={props.autoComplete ? props.autoComplete : "on"}
      value={props.value}
      className={
        props.className +
        (props.hasError
          ? " border-color-input-error-dl"
          : " border-color-input-dl")
      }
    />
  );
}

export default InputField;
