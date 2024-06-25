import { Link } from "react-router-dom";

type TProps = {
  to: string;
  text: string;
};

function LinkButton(props: TProps) {
  return (
    <Link
      to={props.to}
      className="mx-auto mt-6 block w-[95%] rounded-lg border border-primary-200 bg-transparent px-4 py-2 text-center font-semibold text-primary-200 hover:border-transparent hover:bg-primary-300 hover:text-white"
    >
      {props.text}
    </Link>
  );
}

export default LinkButton;
