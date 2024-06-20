import { Link } from "react-router-dom";

type TProps = {
  to: string;
  text: string;
};

function LinkButton(props: TProps) {
  return (
    <Link
      to={props.to}
      className="border-primary-100 text-primary-100 hover:bg-primary-200 mx-auto mt-6 block w-[95%] rounded-lg border bg-transparent px-4 py-2 text-center font-semibold hover:border-transparent hover:text-white"
    >
      {props.text}
    </Link>
  );
}

export default LinkButton;
