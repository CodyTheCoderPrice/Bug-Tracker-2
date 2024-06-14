import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

type Props = {
  message: string | undefined;
};

function ErrorMessage(props: Props) {
  return (
    <>
      {props.message && (
        <p className="text-error-red pt-2 text-sm">
          <FontAwesomeIcon icon={faCircleExclamation} size="lg" />
          <span className="pl-3">{props.message}</span>
        </p>
      )}
    </>
  );
}

export default ErrorMessage;
