import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

type Props = {
  message: string | undefined;
  className?: string;
};

function ErrorMessage(props: Props) {
  return (
    <>
      {props.message && (
        <p className={"pt-2 text-sm text-error-red " + props.className}>
          <FontAwesomeIcon icon={faCircleExclamation} size="lg" />
          <span className="pl-3">{props.message}</span>
        </p>
      )}
    </>
  );
}

export default ErrorMessage;
