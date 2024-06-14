import { Link } from "react-router-dom";

type Props = {
  to: string;
  text: string;
};

function LinkButton(props: Props) {
  return (
    <Link
      to={props.to}
      className="hover:bg-secondary-3 mx-auto mt-6 block w-[95%] rounded-lg border border-secondary-2 bg-transparent px-4 py-2 text-center font-semibold text-secondary-2 hover:border-transparent hover:text-white"
    >
      {props.text}
    </Link>
  );
}

export default LinkButton;
