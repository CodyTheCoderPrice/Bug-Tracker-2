import { Link } from "react-router-dom";

type Props = {
  to: string;
  text: string;
};

function LinkButton(props: Props) {
  return (
    <Link
      to={props.to}
      className="border-primary-1 text-primary-1 hover:bg-secondary-2 mt-6 block w-full rounded border bg-transparent px-4 py-2 text-center font-semibold hover:border-transparent hover:text-white"
    >
      {props.text}
    </Link>
  );
}

export default LinkButton;
