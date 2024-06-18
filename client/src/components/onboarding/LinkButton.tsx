import { Link } from "react-router-dom";

type Props = {
  to: string;
  text: string;
};

function LinkButton(props: Props) {
  return (
    <Link
      to={props.to}
      className="mx-auto mt-6 block w-[95%] rounded-lg border border-primary-1 bg-transparent px-4 py-2 text-center font-semibold text-primary-1 hover:border-transparent hover:bg-primary-2 hover:text-white"
    >
      {props.text}
    </Link>
  );
}

export default LinkButton;
