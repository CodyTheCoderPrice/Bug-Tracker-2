import { Link } from "react-router-dom";

type TProps = {
  to: string;
  text: string;
};

function LinkButton(props: TProps) {
  return (
    <Link to={props.to} className="onboarding-link">
      {props.text}
    </Link>
  );
}

export default LinkButton;
