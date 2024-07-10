import { ChangeEventHandler } from "react";

type TProps = {
  name: string;
  placeholder: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  value: string;
  rows: number;
  cols: number;
  hasError: boolean;
  className?: string;
};

function TextAreaField(props: TProps) {
  return (
    <textarea
      name={props.name}
      placeholder={props.placeholder}
      onChange={props.onChange}
      value={props.value}
      rows={props.rows}
      cols={props.cols}
      className={
        props.className +
        (props.hasError
          ? " border-color-input-error-dl"
          : " border-color-input-dl")
      }
    />
  );
}

export default TextAreaField;
